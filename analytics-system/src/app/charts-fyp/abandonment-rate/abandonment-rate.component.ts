import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import HC_exporting from 'highcharts/modules/exporting';

@Component({
  selector: 'app-abandonment-rate',
  templateUrl: './abandonment-rate.component.html',
  styleUrls: ['./abandonment-rate.component.scss']
})
export class AbandonmentRateComponent implements OnInit {

  chartOptions: {};
  Highcharts = Highcharts;

  constructor() { }

  ngOnInit(): void {

    this.chartOptions = {
      chart: {
        type: 'pie',
        plotBackgroundColor: null,
        plotBorderWidth: 0,
        plotShadow: false,
        renderTo: 'container',
        margin: [0,0,0,0],
                spacingTop: 0,
                spacingBottom: 0,
                spacingLeft: 0,
                spacingRight: 0,
      },
      title: {
          text: '30%<br>Abandonment<br>Rate',
          align: 'center',
          verticalAlign: 'middle',
          y: 14
      },
      tooltip: {
          pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
      },
      accessibility: {
          point: {
              valueSuffix: '%'
          }
      },
      credits: {
        enabled: false
      },
      exporting: {
        enabled: false
      },
      plotOptions: {
          pie: {
              dataLabels: {
                  enabled: false,
                  distance: -50,
                  style: {
                      fontWeight: 'bold',
                      color: 'white'
                  }
              },
              startAngle: 0,
              endAngle: 360,
              center: ['50%', '50%'],
              size: '110%'
          }
      },
      series: [{
          type: 'pie',
          name: 'Percentage',
          innerSize: '80%',
          data: [
              ['Sold', 30],
              ['In Stock', 70],
          ]
      }]
    };

    HC_exporting(Highcharts);

    setTimeout(()=>{
      window.dispatchEvent(
        new Event('resize')
      );
    },300);

  }

}
