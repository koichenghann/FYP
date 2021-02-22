import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MonthlySalesReportChartComponent } from './monthly-sales-report-chart.component';

describe('MonthlySalesReportChartComponent', () => {
  let component: MonthlySalesReportChartComponent;
  let fixture: ComponentFixture<MonthlySalesReportChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MonthlySalesReportChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MonthlySalesReportChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
