import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductCategorySalesReportComponent } from './product-category-sales-report.component';

describe('ProductCategorySalesReportComponent', () => {
  let component: ProductCategorySalesReportComponent;
  let fixture: ComponentFixture<ProductCategorySalesReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductCategorySalesReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductCategorySalesReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
