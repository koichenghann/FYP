import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import HC_exporting from 'highcharts/modules/exporting';

@Component({
  selector: 'app-product-sales-distribution-report-chart',
  templateUrl: './product-sales-distribution-report.component.html',
  styleUrls: ['./product-sales-distribution-report.component.scss']
})
export class ProductSalesDistributionReportComponent implements OnInit {
  chartOptions: {};
  Highcharts = Highcharts;

  constructor() { }

  ngOnInit(): void {
    this.chartOptions = {
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            type: 'pie',
            height: '47%',
            marginBottom: -10,
        },
        title: {
            text: null
        },
        tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        },
        legend: {
          enabled: true,
          align: 'right',
          verticalAlign: 'top',
          layout: 'vertical',
          x: -50,
          y: 45
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
                    enabled: false,
                    format: '<b>{point.name}</b>: {point.percentage:.1f} %'
                },
                showInLegend: true
            }
        },
        exporting: {
          enabled: false
        },
        credits: {
          enabled: false
        },
        series: [{
            name: 'Brands',
            colorByPoint: true,
            data: [{
                name: 'Food',
                y: 61.41,

            }, {
                name: 'Tools',
                y: 11.84
            }, {
                name: 'Gadget',
                y: 10.85
            }, {
                name: 'Electronics',
                y: 4.67
            }, {
                name: 'Lifestyle',
                y: 4.18
            }, {
                name: 'Furtniture',
                y: 1.64
            },{
                name: 'Toys',
                y: 1.64
            },{
                name: 'Cleaning',
                y: 1.64
            },{
                name: 'Vehicle',
                y: 1.64
            },{
                name: 'Stationary',
                y: 1.64
            }]
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
