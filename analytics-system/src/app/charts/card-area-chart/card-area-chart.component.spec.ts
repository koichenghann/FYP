import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardAreaChartComponent } from './card-area-chart.component';

describe('CardAreaChartComponent', () => {
  let component: CardAreaChartComponent;
  let fixture: ComponentFixture<CardAreaChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardAreaChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardAreaChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
