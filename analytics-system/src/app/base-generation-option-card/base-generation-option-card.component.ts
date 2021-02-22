import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-base-generation-option-card',
  templateUrl: './base-generation-option-card.component.html',
  styleUrls: ['./base-generation-option-card.component.scss']
})
export class BaseGenerationOptionCardComponent implements OnInit {
  months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ];
  years = [
    '2019',
    '2020'
  ]
  constructor() { }

  ngOnInit(): void {
  }

}
