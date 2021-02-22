import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductSalesDistributionTableComponent } from './product-sales-distribution-table.component';

describe('ProductSalesDistributionTableComponent', () => {
  let component: ProductSalesDistributionTableComponent;
  let fixture: ComponentFixture<ProductSalesDistributionTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductSalesDistributionTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductSalesDistributionTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
