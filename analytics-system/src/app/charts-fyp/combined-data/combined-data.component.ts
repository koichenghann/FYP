import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import HC_exporting from 'highcharts/modules/exporting';

@Component({
  selector: 'app-combined-data',
  templateUrl: './combined-data.component.html',
  styleUrls: ['./combined-data.component.scss']
})
export class CombinedDataComponent implements OnInit {

  chartOptions: {};
  Highcharts = Highcharts;

  constructor() { }

  ngOnInit(): void {

    this.chartOptions = {
        chart: {
            type: 'column',
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
            // valueSuffix: ' MYR'
        },

        legend: {
          enabled: true,
          align: 'top',
          verticalAlign: 'top',
          y: -17
        },
        credits: {
          enabled: false
        },
        exporting: {
          enabled: false
        },
        yAxis: {
          allowDecimals: false,
          min: 0,
          title: {
            text: null
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
          column: {
            stacking: 'normal'
          },
          series: {
            pointWidth: 15,
            pointStart: 12,
          }
        },

        series: [{
            name: 'Revenue',
            tooltip: {
                valueSuffix: ' MYR'
            },
            data: [50, 30, 40, 50, 80, 40, 70],
            stack: 'one'
        },{
            name: "Average Order's Revenue",
            tooltip: {
                valueSuffix: ' MYR'
            },
            data: [30, 20, 50, 40, 60, 80, 70],
            stack: 'one'
        }, {
            name: 'Orders',
            tooltip: {
                valueSuffix: ' orders'
            },
            data: [3, 4, 4, 7, 8, 5, 10],
            stack: 'one'
        }, {
            name: 'Visitors',
            tooltip: {
                valueSuffix: ' users'
            },
            data: [20, 50, 60, 50, 80, 40, 70],
            stack: 'one'
        },{
            name: 'Customers',
            tooltip: {
                valueSuffix: ' users'
            },
            data: [2, 5, 6, 7, 8, 5, 10],
            stack: 'one'
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
