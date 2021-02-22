import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomDataListComponent } from './custom-data-list.component';

describe('CustomDataListComponent', () => {
  let component: CustomDataListComponent;
  let fixture: ComponentFixture<CustomDataListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomDataListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomDataListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
