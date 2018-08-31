import { ComponentFactoryResolver, Injectable, Injector } from '@angular/core';
import { Router } from '@angular/router';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';

import { forkJoin, Observable, of } from 'rxjs';
import { defaultIfEmpty, filter, map, mergeMap } from 'rxjs/operators';

import { NgxDialogicComponent } from './ngx-dialogic.component';
import { NgxDialogicLoaderComponent } from './ngx-dialogic-loader.component';

import { DialogConfig, DialogConfigOptions } from './ngx-dialogic.models';

import { MODAL_DATA_TOKEN } from './ngx-dialogic-injection-token';

@Injectable({
  providedIn: 'root'
})
export class NgxDialogicService {
  private overlayRef: OverlayRef;
  private isShown = false;

  constructor(
    private resolver: ComponentFactoryResolver,
    private injector: Injector,
    private router: Router,
    private overlay: Overlay
  ) { }

  show(component: any, config: DialogConfig = {}) {
    const dialogLoaderPortal = new ComponentPortal(NgxDialogicLoaderComponent);

    if (this.isShown) {
      this.hide();
    }

    this.toggleShow();

    this.overlayRef = this.overlay.create({
      panelClass: 'ngx-dialogic-overlay'
    });

    if (config.resolve) {
      this.overlayRef.attach(dialogLoaderPortal);
    }

    if (config.options && config.options.closeOnOverlay) {
      this.overlayRef.overlayElement.addEventListener('click', this.hide.bind(this));
    }

    this.resolveComponentDeps(config)
      .subscribe(resolveData => {
        this.createDialogContent(component, resolveData, config);
      }, () => {
        this.hide();
      });
  }

  hide() {
    if (!this.isShown) {
      return;
    }

    this.overlayRef.detach();
    this.overlayRef.dispose();
    this.toggleShow();
  }

  private resolveComponentDeps(config): Observable<any> {
    const routerState = this.router.routerState;
    const activatedRoute = routerState.root;

    return of(config && config.resolve)
      .pipe(
        filter(Boolean),
        map(resolve => {
            return Object.keys(resolve)
              .map(key => {
                return {
                  name: key,
                  resolver: this.injector.get<any>(<any>config.resolve[key])
                };
              });
          }
        ),
        mergeMap(mappedResolvers => {
          return forkJoin(...mappedResolvers
            .map(
              mappedResolver => mappedResolver
                .resolver
                .resolve(routerState.snapshot, activatedRoute.snapshot)
            )
          ).pipe(
            map((resolvedData) => ({ mappedResolvers, resolvedData }))
          );
        }),
        map(({mappedResolvers, resolvedData}) => {
          return resolvedData
            .reduce((acc, v, i) => {
              acc[mappedResolvers[i].name] = v;
              return acc;
            }, {});
        }),
        defaultIfEmpty(null)
      );
  }

  private createDialogContent(component, resolveData, config?: DialogConfig) {
    const inputOutputData = config.data;
    const dialogOptions: DialogConfigOptions = config.options;

    this.overlayRef.detach();

    const dialogPortal = new ComponentPortal(NgxDialogicComponent);
    const dialogRefPortal = this.overlayRef.attach(dialogPortal);
    const childInjector = Injector.create({
      providers: [{
        provide: MODAL_DATA_TOKEN,
        useValue: resolveData
      }]
    });
    const componentFactory = this.resolver.resolveComponentFactory(component);
    const componentRef = componentFactory.create(childInjector);

    dialogRefPortal.instance.dialogCloseRef.nativeElement.addEventListener('click', () => {
      this.hide();
    });

    if (dialogOptions && dialogOptions.isTopAligned) {
      dialogRefPortal.instance['elementRef'].nativeElement.classList.add('ngx-dialogic-component--top-aligned');
    }

    Object.keys(inputOutputData || {}).map(key => {
      if (typeof inputOutputData[key] === 'function') {
        componentRef.instance[key].subscribe(inputOutputData[key]);
      } else {
        componentRef.instance[key] = inputOutputData[key];
      }
    });

    dialogRefPortal.instance.dialogContentRef.insert(componentRef.hostView);
  }

  private toggleShow() {
    this.isShown = !this.isShown;
  }
}
