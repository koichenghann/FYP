import { Component,  OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';

@Component({
  selector:'app-column-user-behavior',
  templateUrl: 'column-user-behavior.component.html',
  styleUrls: ['column-user-behavior.component.scss'],

})

export class ColumnUserBehaviorComponent implements OnInit {
  chartOptions: {};
  Highcharts = Highcharts;
  constructor() {};

  ngOnInit(){
    this.chartOptions =
    {
      chart: {
          type: 'column'
      },
      title: {
          text: "User's behavior analysis 2020"
      },
      subtitle: {
          text: ''
      },
      xAxis: {
          categories: [

              'Jun',
              'Jul',
              'Aug',
              'Sep',
              'Oct',
              'Nov'
          ],
          crosshair: true
      },
      yAxis: {
          min: 0,
          title: {
              text: ''
          }
      },
      tooltip: {
          headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
          pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
              '<td style="padding:0"><b>{point.y:.1f} %</b></td></tr>',
          footerFormat: '</table>',
          shared: true,
          useHTML: true

      },
      plotOptions: {
          column: {
              pointPadding: 0.2,
              borderWidth: 0
          }
      },
      series: [{
          name: 'Bounce Rate',
          data: [49.9, 71.5, 106.4, 129.2, 144.0, 176.0],
          color: '#B6CEC7'
      }, {
          name: 'Coversion Rate',
          data: [83.6, 78.8, 98.5, 93.4, 106.0, 84.5],
          color: '#86A3C3'
      }, {
          name: 'Average Time On Page',
          data: [48.9, 38.8, 39.3, 41.4, 47.0, 48.3],
          color: '#7268A6'
      }, {
          name: 'Exit Rate',
          data: [42.4, 33.2, 34.5, 39.7, 52.6, 75.5],
          color: '#6B3074'
      }]
  }
  }
}
