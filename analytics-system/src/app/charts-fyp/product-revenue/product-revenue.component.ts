import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import HC_exporting from 'highcharts/modules/exporting';

@Component({
  selector: 'app-product-revenue',
  templateUrl: './product-revenue.component.html',
  styleUrls: ['./product-revenue.component.scss']
})
export class ProductRevenueComponent implements OnInit {

  chartOptions: {};
  Highcharts = Highcharts;

  constructor() { }

  ngOnInit(): void {

    this.chartOptions = {
        chart: {
            type: 'line',
            marginTop: 50

        },
        title: {
            text: null
        },
        subtitle: {
            text: null
        },
        tooltip: {
            split: true,
            valueSuffix: ' MYR'
        },

        legend: {
          enabled: true,
          align: 'top',
          verticalAlign: 'top',
          y: -18
        },
        credits: {
          enabled: false
        },
        exporting: {
          enabled: false
        },
        yAxis: {
          title: {
            text: null
          },
          labels: {
            format: '{value} MYR'
          }
        },
        xAxis: {
          // reversed: false,
          gridLineWidth: 1,
          title: {
            text: null
          },
          labels: {
            format: "Nov {value}"
          }
        },
        plotOptions: {
          series: {
              label: {
                  connectorAllowed: false
              },
              pointStart: 12,
              marker: {
                fillColor: '#1441c9',
                lineWidth: 2,
                lineColor: '#1441c9'
            }
          },
          line: {
            lineColor:'#1441c9'
          }
        },

        series: [{
          name: 'Revenue',
          data: [50, 150, 90, 190, 160, 220, 110]
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
