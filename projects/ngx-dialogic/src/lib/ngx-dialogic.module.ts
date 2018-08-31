import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { OverlayModule } from '@angular/cdk/overlay';

import { NgxDialogicComponent } from './ngx-dialogic.component';
import { NgxDialogicLoaderComponent } from './ngx-dialogic-loader.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot([]),
    OverlayModule
  ],
  declarations: [
    NgxDialogicComponent,
    NgxDialogicLoaderComponent
  ],
  entryComponents: [
    NgxDialogicComponent,
    NgxDialogicLoaderComponent
  ]
})
export class NgxDialogicModule {
}
