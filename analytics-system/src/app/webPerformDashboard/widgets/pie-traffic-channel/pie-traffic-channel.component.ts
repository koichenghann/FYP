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
              y: 100.00,
              sliced: true,
              selected: true
          }, {
              name: 'Referral',
              y: 0.00
          }, {
              name: 'Email',
              y: 0.00
          }, {
              name: 'Paid Search',
              y: 0.00
          }, {
              name: 'Search',
              y: 0.00
          }, {
              name: 'Social Media',
              y: 0.00
          }]
      }]
  }

  }
}
