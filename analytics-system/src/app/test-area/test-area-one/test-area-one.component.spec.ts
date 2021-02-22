import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestAreaOneComponent } from './test-area-one.component';

describe('TestAreaOneComponent', () => {
  let component: TestAreaOneComponent;
  let fixture: ComponentFixture<TestAreaOneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestAreaOneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestAreaOneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
