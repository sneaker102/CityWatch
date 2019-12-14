import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RideSharingComponent } from './ride-sharing.component';

describe('RideSharingComponent', () => {
  let component: RideSharingComponent;
  let fixture: ComponentFixture<RideSharingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RideSharingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RideSharingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
