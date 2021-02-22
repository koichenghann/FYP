import { Component,  OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';

@Component({
  selector:'app-line-user-metric',
  templateUrl: 'line-user-metric.component.html',
  styleUrls: ['line-user-metric.component.scss'],

})

export class LineUserMetricComponent implements OnInit {
  chartOptions: {};
  Highcharts = Highcharts;
  constructor() {};

  ngOnInit(){
    this.chartOptions ={


      title: {
          text: "User's activities analysis 2020"
      },

      subtitle: {
          text: ''
      },

      yAxis: {
          title: {
              enabled: false
          }
      },

      xAxis: {
        categories: ['Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov']
      },

      legend: {
          layout: 'vertical',
          align: 'right',
          verticalAlign: 'middle'
      },

      plotOptions: {
          series: {
              label: {
                  connectorAllowed: false
              },

          }
      },

      series: [{
          name: 'Visitors',
          data: [43934, 52503, 57177, 69658, 97031, 119931],
          color:'#FFCF6A'
      }, {
          name: 'Sessions',
          data: [24916, 24064, 29742, 29851, 32490, 45800],
          color: '#FFBC6A'
      }, {
          name: 'Pageviews',
          data: [11744, 17722, 16005, 19771, 20185, 32900],
          color: '#FF965B'
      }, {
          name: 'Sign-Up Users',
          data: [8120,  9830, 7988, 12169, 15112, 22452],
          color: '#FF6D6A'
      }],

      responsive: {
          rules: [{
              condition: {
                  maxWidth: 500
              },
              chartOptions: {
                  legend: {
                      layout: 'horizontal',
                      align: 'center',
                      verticalAlign: 'bottom'
                  }
              }
          }]
      }

  }

  }

}
