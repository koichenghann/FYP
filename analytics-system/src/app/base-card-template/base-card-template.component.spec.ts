import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BaseCardTemplateComponent } from './base-card-template.component';

describe('BaseCardTemplateComponent', () => {
  let component: BaseCardTemplateComponent;
  let fixture: ComponentFixture<BaseCardTemplateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BaseCardTemplateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BaseCardTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
