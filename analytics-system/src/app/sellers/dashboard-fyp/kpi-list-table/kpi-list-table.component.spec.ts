import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KpiListTableComponent } from './kpi-list-table.component';

describe('KpiListTableComponent', () => {
  let component: KpiListTableComponent;
  let fixture: ComponentFixture<KpiListTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KpiListTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KpiListTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
