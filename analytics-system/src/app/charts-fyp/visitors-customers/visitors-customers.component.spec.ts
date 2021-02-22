import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VisitorsCustomersComponent } from './visitors-customers.component';

describe('VisitorsCustomersComponent', () => {
  let component: VisitorsCustomersComponent;
  let fixture: ComponentFixture<VisitorsCustomersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VisitorsCustomersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VisitorsCustomersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
