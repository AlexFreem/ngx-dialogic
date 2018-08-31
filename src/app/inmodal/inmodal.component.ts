import { Component, Inject, Input } from '@angular/core';
import { MODAL_DATA_TOKEN } from '../../../projects/ngx-dialogic/src/lib/ngx-dialogic-injection-token';

@Component({
  selector: 'app-inmodal',
  templateUrl: './inmodal.component.html',
  styleUrls: ['./inmodal.component.css']
})
export class InmodalComponent {

  data: any;

  @Input() testInput: any;

  constructor(@Inject(MODAL_DATA_TOKEN) private modalData) {
    this.data = (modalData && modalData.GithubUser) || 'No data';
  }
}
