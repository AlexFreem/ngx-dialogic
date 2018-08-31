import { Component, ViewEncapsulation } from '@angular/core';

import { InmodalComponent } from './inmodal/inmodal.component';
import { NgxDialogicService } from '../../projects/ngx-dialogic/src/public_api';
import { SampleResolve } from './resolve/resolve';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {
  title = 'ngx-dialogic';

  constructor(private dialog: NgxDialogicService) {}

  withoutResolve = () => {
    this.dialog.show(InmodalComponent);
  }

  withResolve = () => {
    this.dialog.show(InmodalComponent, {
      data: {
        testInput: 'Test Input Content'
      },
      resolve: {
        GithubUser: SampleResolve
      }
    });
  }

  topAligned = () => {
    this.dialog.show(InmodalComponent, {
      options: {
        isTopAligned: true,
        closeOnOverlay: true
      }
    });
  }
}
