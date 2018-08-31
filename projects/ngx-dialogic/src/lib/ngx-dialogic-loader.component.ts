import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'ngx-dialogic-loader',
  template: `<div class="ngx-dialogic-loader-content">
    <div class="ngx-dialogic-loader-item"></div>
    <div class="ngx-dialogic-loader-item"></div>
    <div class="ngx-dialogic-loader-item"></div>
    <div class="ngx-dialogic-loader-item"></div>
  </div>`,
  encapsulation: ViewEncapsulation.None
})
export class NgxDialogicLoaderComponent {}
