import { Component,  OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';

@Component({
  selector:'app-widget-area-line',
  templateUrl: 'area-line.component.html',
  styleUrls: ['area-line.component.scss'],

})

export class AreaLineComponent implements OnInit {
  chartOptions: {};
  Highcharts = Highcharts;
  constructor() {};

  ngOnInit(){
    this.chartOptions = {
      chart: {
          type: 'line'
      },
      title: {
          text: ''
      },
      subtitle: {
          text: ''
      },
      xAxis: {
          categories: ['Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov']
      },
      yAxis: {
          title: {
              text: ''
          }
      },
      plotOptions: {
          line: {
              dataLabels: {
                  enabled: false
              },
              enableMouseTracking: true
          },

          series: {
            color: 'orange'
        }
      },
      series: [{
          name: "Visitors",
          data: [9800, 8700, 11000, 12400, 13900, 12900]
      }]
  }
}}
