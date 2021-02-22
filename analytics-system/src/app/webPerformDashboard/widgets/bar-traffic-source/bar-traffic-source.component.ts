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
          categories: ['university.help.edu.my',
                        'google.com',
                        'facebook.com',
                        'help.edu.my',
                        'images.google.my',
                        'hlms.help.edu.my'],
          title: {
              text: null
          }
      },
      yAxis: {
          min: 0,
          title: {
              text: 'Sessions',
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
          name: ['Sessions'],
          data: [1250, 860, 635, 286, 211, 105]
      }]
  }
  }
}
