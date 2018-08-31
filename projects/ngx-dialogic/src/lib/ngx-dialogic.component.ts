import { Component, ElementRef, ViewChild, ViewContainerRef, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'ngx-dialogic',
  template: `
  <div class="ngx-dialogic-header">
    <div #dialogClose class="ngx-dialogic-close"></div>
  </div>
  <div class="ngx-dialogic-wrapper">
    <ng-template #dialogContent></ng-template>
  </div>`,
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['../sass/styles.sass']
})
export class NgxDialogicComponent {
  @ViewChild('dialogContent', {read: ViewContainerRef}) public dialogContentRef: ViewContainerRef;
  @ViewChild('dialogClose') public dialogCloseRef: ElementRef;

  constructor(
    private elementRef: ElementRef
  ) {
  }
}
