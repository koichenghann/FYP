import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ForecastSalesChartComponent } from './forecast-sales-chart.component';

describe('ForecastSalesChartComponent', () => {
  let component: ForecastSalesChartComponent;
  let fixture: ComponentFixture<ForecastSalesChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ForecastSalesChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForecastSalesChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
