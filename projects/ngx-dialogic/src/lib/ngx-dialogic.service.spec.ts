import { TestBed, inject } from '@angular/core/testing';

import { NgxDialogicService } from './ngx-dialogic.service';

describe('NgxDialogicService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NgxDialogicService]
    });
  });

  it('should be created', inject([NgxDialogicService], (service: NgxDialogicService) => {
    expect(service).toBeTruthy();
  }));
});
