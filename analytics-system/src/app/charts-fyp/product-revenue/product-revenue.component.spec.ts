import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductRevenueComponent } from './product-revenue.component';

describe('ProductRevenueComponent', () => {
  let component: ProductRevenueComponent;
  let fixture: ComponentFixture<ProductRevenueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductRevenueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductRevenueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
