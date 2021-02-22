import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardFypComponent } from './dashboard-fyp.component';

describe('DashboardFypComponent', () => {
  let component: DashboardFypComponent;
  let fixture: ComponentFixture<DashboardFypComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardFypComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardFypComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
