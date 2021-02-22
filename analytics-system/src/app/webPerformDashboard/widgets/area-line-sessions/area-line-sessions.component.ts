import { Component,  OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';

@Component({
  selector:'app-widget-area-line-sessions',
  templateUrl: 'area-line-sessions.component.html',
  styleUrls: ['area-line-sessions.component.scss'],

})

export class AreaLineSessionsComponent implements OnInit {
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
          name: "Sessions",
          data: [4500, 3750, 5670, 6350, 7200, 6880]
      }]
  }
}}
