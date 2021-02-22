import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ForecastProductSalesChartComponent } from './forecast-product-sales-chart.component';

describe('ForecastProductSalesChartComponent', () => {
  let component: ForecastProductSalesChartComponent;
  let fixture: ComponentFixture<ForecastProductSalesChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ForecastProductSalesChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForecastProductSalesChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
