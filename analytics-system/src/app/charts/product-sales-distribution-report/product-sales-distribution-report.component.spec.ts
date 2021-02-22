import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductSalesDistributionReportComponent } from './product-sales-distribution-report.component';

describe('ProductSalesDistributionReportComponent', () => {
  let component: ProductSalesDistributionReportComponent;
  let fixture: ComponentFixture<ProductSalesDistributionReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductSalesDistributionReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductSalesDistributionReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
