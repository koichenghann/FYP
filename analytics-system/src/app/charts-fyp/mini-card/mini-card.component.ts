import { Component, OnInit, Input, ViewChild } from '@angular/core';
import * as Highcharts from 'highcharts';
import HC_exporting from 'highcharts/modules/exporting';
import { Subscription } from 'rxjs';
import { RecommendationServiceService } from 'src/app/services/recommendation-service.service';


@Component({
  selector: 'app-mini-card',
  templateUrl: './mini-card.component.html',
  styleUrls: ['./mini-card.component.scss']
})
export class MiniCardComponent implements OnInit {
  customColor;
  negativeColor = '#ff4242';
  displayPercent;

//#03bf00
  @ViewChild('percentage') percent;
  @ViewChild('icon') icon;

  // @Input() total: number;
  @Input() label: string;
  @Input() total: number;
  @Input() suffix: string;
  @Input() percentage: number;
  @Input() hidechart: boolean;
  @Input() colorTheme: string;
  @Input() data: number[];
  @Input() hideIcon: boolean;
  @Input() date: [];




  chartOptions: {};
  Highcharts = Highcharts;
  // Highcharts.seriesTypes.line.prototype.getPointSpline = Highcharts.seriesTypes.spline.prototype.getPointSpline;



  constructor(public recoService: RecommendationServiceService) { }
  orders_retrieved: Subscription;
  refresh2: Subscription;

  ngAfterViewInit() {

  if ( this.percentage > 0 ) {
    this.customColor = this.colorTheme;
  }
  else if (this.percentage < 0) {
    this.customColor = this.negativeColor;
  }
  else {
    this.customColor = 'blue';
  }

  }

  ngOnInit(): void {
    // alert(this.date)

    this.refresh2 = this.recoService.get_refreh_listener2().subscribe((res)=>{
      if(this.label == 'Revenue') {
        this.data = res[0]
      } else if( this.label == 'Orders') {
        this.data = res[1]
      } else if( this.label == 'Item Sold') {
        this.data = res[2]
      } else if( this.label == 'Conversion Rate') {
        this.data = res[3]
      }
      this.percentage = (this.data[3]-this.data[2])/this.data[2]*100;
      if (Number.isNaN(this.percentage)){
        this.percentage = 0
      }
      if (Number.isNaN(this.total)) {
        this.total = 0
      }
      this.loadChart()
      console.log(this.data)
    })



  }

  loadChart() {
    this.displayPercent = Math.abs(Math.round(this.percentage));
    if ( this.percentage > 0 ) {
      this.customColor = this.colorTheme;
    }
    else if (this.percentage < 0) {
      this.customColor = this.negativeColor;
    }
    else {
      this.customColor = 'blue';
    }

    this.chartOptions = {
        chart: {
            type: 'spline',
            backgroundColor: null,
            borderWidth: 0,
            margin: [2, 2, 2, 2],
            height: 50,
        },
        title: {
            text: null
        },
        subtitle: {
            text: null
        },
        tooltip: {
            split: false,
            outside: false
        },
        legend: {
          enabled: false
        },
        credits: {
          enabled: false
        } ,
        exporting: {
          enabled: false
        },
        xAxis: {
          categories: this.date,
          labels: {
            enabled: false,

          },
          title: {
            text: null
          },
          startOnTick: false,
          endOnTick: false,
          tickOptions: [],
          visible: false

        },
        yAxis: {
          labels: {
            enabled: false,

          },
          title: {
            text: null
          },
          startOnTick: false,
          endOnTick: false,
          tickOptions: [],
          tickWidth: 0,
          crosshair: false,
          lineWidth: 0,
          gridLineWidth:0,
          visible: false
        },
        plotOptions: {
          spline: {
              marker: {
                  enabled: false,
                  radius: 4,
                  lineColor: this.customColor,
                  lineWidth: 1
                },
                lineColor: this.customColor
              }
        },

        series: [{
          data: this.data,
          name: 'val'
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
    this.refresh2.unsubscribe();
  }


}
