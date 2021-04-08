import { Component, Input, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import HC_exporting from 'highcharts/modules/exporting';
import { Subscription } from 'rxjs';
import { RecommendationServiceService } from 'src/app/services/recommendation-service.service';

@Component({
  selector: 'app-sales-orders',
  templateUrl: './sales-orders.component.html',
  styleUrls: ['./sales-orders.component.scss']
})
export class SalesOrdersComponent implements OnInit {
  @Input() data = []
  //date
  //revenue
  //Order
  //Item sold
  //Average Order Revenue

  chartOptions: {};
  Highcharts = Highcharts;
  refresh: Subscription;

  constructor(public recoService: RecommendationServiceService) { }

  ngOnInit(): void {
    this.refresh = this.recoService.get_refreh_listener().subscribe((res)=>{
      if (res.chart == 'spline-chart') {
        // alert('helo')
        this.loadChart(res.data.date, res.data.revenue, res.data.order, res.data.quantity, res.data.avgOrderVal)
      }
    })
  }

  loadChart(date, revenue, order, quantity, avgOrderVal) {
    this.chartOptions = {
        chart: {
            type: 'areaspline',
            marginTop: 50

        },
        title: {
            text: null
        },
        subtitle: {
            text: null
        },
        // tooltip: {
        //     split: true,
        //     valueSuffix: ' MYR'
        // },

        legend: {
          enabled: true,
          align: 'top',
          verticalAlign: 'top',
          y: -16
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
            format: '{value}'
          }
        },
        xAxis: {
          min:0.5,
          max:5.5,
          tickInterval:1,
          maxPadding:0,
          endOnTick:false,
          startOnTick:false,
          categories: date,
          // reversed: false,
          gridLineWidth: 1,
          title: {
            text: null
          },
          labels: {
            format: "{value}"
          }
        },
        plotOptions: {
          series: {
              label: {
                  connectorAllowed: false
              },
              // pointStart: 0,
              marker: {
                enabled: false,
                // fillColor: '#1441c9',
                // lineWidth: 2,
                // lineColor: '#1441c9'
            }
          },
          areaspline: {
           fillOpacity: 0.1
          }
        },

        series: [{
          name: 'Revenue',
          tooltip: {
            valueSuffix: ' MYR',
          },
          data: revenue
        },
        {
          name: 'Order',
          tooltip: {
            valueSuffix: ' Orders',
          },
          data: order
        },
        {
          name: 'Item Sold',
          tooltip: {
            valueSuffix: ' Item Sold',
          },
          data: quantity
        },
        {
          name: 'Average Order Revenue',
          tooltip: {
            valueSuffix: ' Average Order Revenue',
          },
          data: avgOrderVal
        }]
    };

    HC_exporting(Highcharts);

    setTimeout(()=>{
      window.dispatchEvent(
        new Event('resize')
      );
    },300);
  }

  ngOnDestroy(){
    this.refresh.unsubscribe();
  }
}
