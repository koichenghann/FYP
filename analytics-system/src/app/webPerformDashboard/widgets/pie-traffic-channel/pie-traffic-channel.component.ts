import { Component,  OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';

@Component({
  selector:'app-widget-pie-channel',
  templateUrl: 'pie-traffic-channel.component.html',
  styleUrls: ['pie-traffic-channel.component.scss'],

})
export class PieTrafficChannelComponent implements OnInit{
  chartOptions: {};
  Highcharts = Highcharts;
  constructor() {};

  ngOnInit(){
    this.chartOptions = {
      chart: {
          plotBackgroundColor: null,
          plotBorderWidth: null,
          plotShadow: false,
          type: 'pie'
      },
      title: {
          text: 'Top Traffic Sources'
      },
      tooltip: {
          pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
      },
      accessibility: {
          point: {
              valueSuffix: '%'
          }
      },
      plotOptions: {
          pie: {
              allowPointSelect: true,
              cursor: 'pointer',
              dataLabels: {
                  enabled: true
              },
              showInLegend: true
          }
      },
      series: [{
          name: 'Source',
          colorByPoint: true,
          data: [{
              name: 'Direct',
              y: 61.41,
              sliced: true,
              selected: true
          }, {
              name: 'Referral',
              y: 11.84
          }, {
              name: 'Email',
              y: 10.85
          }, {
              name: 'Paid Search',
              y: 4.67
          }, {
              name: 'Search',
              y: 4.18
          }, {
              name: 'Social Media',
              y: 7.05
          }]
      }]
  }

  }
}
