import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-monthly-sales-report',
  templateUrl: './monthly-sales-report.component.html',
  styleUrls: ['./monthly-sales-report.component.scss']
})
export class MonthlySalesReportComponent implements OnInit {
  panelOpenState = false;
  datasource = [];
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
  // year = "2020";



  constructor() { }

  ngOnInit(): void {

    for (var year of this.years) {
      for (var month of this.months) {
        this.datasource.push({year: year, month: month, open: false});
      }
    }


    this.datasource.reverse();
  }

}
