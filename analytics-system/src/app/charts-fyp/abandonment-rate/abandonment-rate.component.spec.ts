import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AbandonmentRateComponent } from './abandonment-rate.component';

describe('AbandonmentRateComponent', () => {
  let component: AbandonmentRateComponent;
  let fixture: ComponentFixture<AbandonmentRateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AbandonmentRateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AbandonmentRateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
