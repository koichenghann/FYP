import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import HC_exporting from 'highcharts/modules/exporting';

@Component({
  selector: 'app-sales-report-chart',
  templateUrl: './sales-report.component.html',
  styleUrls: ['./sales-report.component.scss']
})
export class SalesReportComponent implements OnInit {

  chartOptions: {};
  Highcharts = Highcharts;

  constructor() { }

  ngOnInit(): void {

    this.chartOptions = {
        chart: {
            type: 'area',
            height: '23%'

        },
        title: {
            text: null
        },
        subtitle: {
            text: null
        },
        tooltip: {
            split: true,
            valueSuffix: ' millions'
        },
        legend: {
          enabled: false
        },
        credits: {
          enabled: false
        },
        exporting: {
          enabled: false
        },
        series: [{
          data: [100, 200, 300, 250, 50, 350, 150, 70, 230, 50, 350, 150, 70, 230, 200, 300, 250, 50, 100, 200, 300, 250, 50, 350, 150, 70, 230, 50, 350, 150, 70]
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
