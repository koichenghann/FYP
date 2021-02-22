import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DataEntryManagementComponent } from './data-entry-management.component';

describe('DataEntryManagementComponent', () => {
  let component: DataEntryManagementComponent;
  let fixture: ComponentFixture<DataEntryManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DataEntryManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataEntryManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
