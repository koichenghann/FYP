import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import HC_exporting from 'highcharts/modules/exporting';

@Component({
  selector: 'app-product-single-category-sales-report-chart',
  templateUrl: './product-single-category-sales-report-chart.component.html',
  styleUrls: ['./product-single-category-sales-report-chart.component.scss']
})
export class ProductSingleCategorySalesReportChartComponent implements OnInit {
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
            height: '65%',
            marginTop: 30


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
            x: -20,
            y: 65
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
            name: 'Product',
            colorByPoint: true,
            data: [{
                name: 'Chair 1',
                y: 61.41,

            }, {
                name: 'Table 1',
                y: 11.84
            }, {
                name: 'Table 2',
                y: 10.85
            }, {
                name: 'Sofa 1',
                y: 4.67
            }, {
                name: 'Shelf 1',
                y: 4.18
            }, {
                name: 'Desk 1',
                y: 1.64
            },{
                name: 'Shelf 2',
                y: 1.64
            },{
                name: 'Shelf 3',
                y: 1.64
            },{
                name: 'Carpet 1',
                y: 1.64
            },{
                name: 'Shelf 4',
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
