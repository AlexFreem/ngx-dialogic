import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { NgxDialogicModule } from '../../projects/ngx-dialogic/src/lib/ngx-dialogic.module';

import { AppComponent } from './app.component';
import { InmodalComponent } from './inmodal/inmodal.component';

@NgModule({
  declarations: [
    AppComponent,
    InmodalComponent
  ],
  imports: [
    BrowserModule,
    RouterModule,
    HttpClientModule,
    NgxDialogicModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [InmodalComponent]
})
export class AppModule { }
