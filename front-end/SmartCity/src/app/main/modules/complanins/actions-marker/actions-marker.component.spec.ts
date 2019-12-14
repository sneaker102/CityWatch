import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionsMarkerComponent } from './actions-marker.component';

describe('ActionsMarkerComponent', () => {
  let component: ActionsMarkerComponent;
  let fixture: ComponentFixture<ActionsMarkerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActionsMarkerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActionsMarkerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
