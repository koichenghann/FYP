import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ForecastReportComponent } from './forecast-report.component';

describe('ForecastReportComponent', () => {
  let component: ForecastReportComponent;
  let fixture: ComponentFixture<ForecastReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ForecastReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForecastReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
