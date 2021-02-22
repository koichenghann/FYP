import { Component, OnInit, Input } from '@angular/core';
import * as Highcharts from 'highcharts';
import HC_exporting from 'highcharts/modules/exporting';

@Component({
  selector: 'app-monthly-sales-report-chart',
  templateUrl: './monthly-sales-report-chart.component.html',
  styleUrls: ['./monthly-sales-report-chart.component.scss']
})
export class MonthlySalesReportChartComponent implements OnInit {
  @Input() month: string;
  @Input() year: string;
  chartOptions: {};
  Highcharts = Highcharts;

  constructor() { }

  ngOnInit(): void {

    this.chartOptions = {
        chart: {
            type: 'area',
            height: '30%'

        },
        title: {
            text: null
            // text: 'Monthly Sales Report of ' + this.month + ' ' + this.year
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
