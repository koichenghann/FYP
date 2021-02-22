import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductSingleCategorySalesReportChartComponent } from './product-single-category-sales-report-chart.component';

describe('ProductSingleCategorySalesReportChartComponent', () => {
  let component: ProductSingleCategorySalesReportChartComponent;
  let fixture: ComponentFixture<ProductSingleCategorySalesReportChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductSingleCategorySalesReportChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductSingleCategorySalesReportChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
