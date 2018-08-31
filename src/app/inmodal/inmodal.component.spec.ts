import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InmodalComponent } from './inmodal.component';

describe('InmodalComponent', () => {
  let component: InmodalComponent;
  let fixture: ComponentFixture<InmodalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InmodalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InmodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
