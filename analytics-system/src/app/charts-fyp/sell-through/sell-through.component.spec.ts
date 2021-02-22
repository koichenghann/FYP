import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SellThroughComponent } from './sell-through.component';

describe('SellThroughComponent', () => {
  let component: SellThroughComponent;
  let fixture: ComponentFixture<SellThroughComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SellThroughComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SellThroughComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
