import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComplaninsComponent } from './complanins.component';

describe('ComplaninsComponent', () => {
  let component: ComplaninsComponent;
  let fixture: ComponentFixture<ComplaninsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComplaninsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComplaninsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
