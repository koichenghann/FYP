import { Component,  OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';

@Component({
  selector:'bar-traffic-source',
  templateUrl: 'bar-traffic-source.component.html',
  styleUrls: ['bar-traffic-source.component.scss'],

})

export class BarTrafficSourceComponent implements OnInit {
  chartOptions: {};
  Highcharts = Highcharts;
  constructor() {};

  ngOnInit(){
    this.chartOptions ={
      chart: {
          type: 'bar'
      },
      title: {
          text: 'Top Referrers'
      },
      subtitle: {
          text: ''
      },
      xAxis: {
          categories: ['localhost:4200',
                        'localhost:49620',
                        'help.edu.my',
                        'hlms.help.edu.my',
                        'www.facebook.com'
                        ],
          title: {
              text: null
          }
      },
      yAxis: {
          min: 0,
          title: {
              text: 'Number of traffics',
              align: 'high'
          },
          labels: {
              overflow: 'justify'
          }
      },
      tooltip: {
          enabled: true
      },
      plotOptions: {
          bar: {
              dataLabels: {
                  enabled: true
              }
          }
      },
      legend: {
          layout: 'vertical',
          align: 'right',
          verticalAlign: 'top',
          x: -40,
          y: 80,
          floating: true,
          borderWidth: 1,
          backgroundColor:
              Highcharts.defaultOptions.legend.backgroundColor || '#FFFFFF',
          shadow: true,
          enabled:false
      },
      credits: {
          enabled: false
      },
      series: [{
          name: ['Number of Traffics'],
          data: [387, 5, 0, 0, 0]
      }]
  }
  }
}
