import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BaseGenerationOptionCardComponent } from './base-generation-option-card.component';

describe('BaseGenerationOptionCardComponent', () => {
  let component: BaseGenerationOptionCardComponent;
  let fixture: ComponentFixture<BaseGenerationOptionCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BaseGenerationOptionCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BaseGenerationOptionCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
