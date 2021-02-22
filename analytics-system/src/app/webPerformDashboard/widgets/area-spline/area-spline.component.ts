import { Component,  OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';

@Component({
  selector:'app-widget-area-spline',
  templateUrl: 'area-spline.component.html',
  styleUrls: ['area-spline.component.scss'],

})

export class AreaSplineComponent implements OnInit {
  chartOptions: {};
  Highcharts = Highcharts;
  constructor() {};

  ngOnInit(){
    this.chartOptions ={
      chart: {
          type: 'areaspline',
          backgroundColor: null,
      },
      title: {
          text: ''
      },
      legend: {
          layout: 'vertical',
          align: 'left',
          verticalAlign: 'top',
          x: 150,
          y: 100,
          floating: true,
          borderWidth: 1,
          backgroundColor:
              Highcharts.defaultOptions.legend.backgroundColor || '#FFFFFF'
            ,
            enabled:false
      },
      xAxis: {
          categories: [
              'Monday',
              'Tuesday',
              'Wednesday',
              'Thursday',
              'Friday',
              'Saturday',
              'Sunday'
          ],
          labels: {
            enabled: false
        }

      },
      yAxis: {
          title: {
              text: ''
          },
          labels: {
            enabled: false
        },
        gridLineWidth: 0,
      },
      tooltip: {
          shared: false,
          valueSuffix: ' units',
          enabled: false
      },
      credits: {
          enabled: false
      },
      plotOptions: {

        line: {
          enableMouseTracking: false
      },
          areaspline: {
              fillOpacity: 0.5
          },




      },
      series: [{
          name: 'John',
          data: [10, 5, 8, 4, 7, 15, 12]
      }]
  }
}
}
