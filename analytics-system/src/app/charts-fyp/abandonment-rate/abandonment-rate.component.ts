import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import HC_exporting from 'highcharts/modules/exporting';
import { Subscription } from 'rxjs';
import { RecommendationServiceService } from 'src/app/services/recommendation-service.service';

@Component({
  selector: 'app-abandonment-rate',
  templateUrl: './abandonment-rate.component.html',
  styleUrls: ['./abandonment-rate.component.scss']
})
export class AbandonmentRateComponent implements OnInit {

  chartOptions: {};
  Highcharts = Highcharts;
  refresh: Subscription;

  abandonedCarts = 0
  abandonedRevenue = 0


  constructor(public recoService: RecommendationServiceService) { }

  ngOnInit(): void {
    this.refresh = this.recoService.get_refreh_listener().subscribe((res)=>{
      if (res.chart == 'pie-chart') {
        // alert('helo')
        this.loadChart(res.data.totalCarts, res.data.abandonmentRate, res.data.abandonedCarts, res.data.abandonedRevenue);
        this.abandonedCarts = res.data.abandonedCarts;
        this.abandonedRevenue = res.data.abandonedRevenue
        // console.log(res)
      }
    })
  }

  loadChart(totalCarts, abandonmentRate, abandonedCarts, abandonedRevenue) {
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
          text: abandonmentRate + '%<br>Abandonment<br>Rate',
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
              ['Abandoned', abandonedCarts],
              ['Sold', totalCarts - abandonedCarts],
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

  ngOnDestroy(){
    this.refresh.unsubscribe();
  }

}
