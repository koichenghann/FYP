import { Component,  OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';

@Component({
  selector:'app-widget-semipie',
  templateUrl: 'semi-pie.component.html',
  styleUrls: ['semi-pie.component.scss'],

})
export class SemiPieComponent implements OnInit{
  chartOptions: {};
  Highcharts = Highcharts;
  constructor() {};


  ngOnInit(){
    this.chartOptions ={
      chart: {
        plotBackgroundColor: null,
        plotBorderWidth: 0,
        plotShadow: false
    },
    title: {
        text: 'Platforms',
        align: 'center',
        verticalAlign: 'middle',
        y: 50
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
            dataLabels: {
                enabled: true,
                distance: 20,
                style: {
                    fontWeight: 'light',
                    color: 'grey'
                }
            },
            startAngle: -90,
            endAngle: 90,
            center: ['50%', '100%'],
            size: '200%'
        }
    },
    series: [{
        type: 'pie',
        name: 'Plaform share',
        innerSize: '60%',
        data: [
            ['Desktop', 100],
            ['Mobile', 0],
        ],
        dataLabels: {
          enabled: true,
          format: '{point.name}: {point.y:.1f}%'
      }
      }
    ]}
  }
}
