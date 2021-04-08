import { Component,  OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';

@Component({
  selector:'app-widget-area-line',
  templateUrl: 'area-line.component.html',
  styleUrls: ['area-line.component.scss'],

})

export class AreaLineComponent implements OnInit {
  chartOptions: {};
  Highcharts = Highcharts;
  constructor() {};


  dateIndex;
  listDateofPastSixMonths = []
  listOfPastSixMonths = []

  ngOnInit():void{

    this.getPreviousSixMonth();




    this.chartOptions = {
      chart: {
          type: 'line'
      },
      title: {
          text: ''
      },
      subtitle: {
          text: ''
      },
      xAxis: {
          categories: this.listOfPastSixMonths,
      },
      yAxis: {
          title: {
              text: ''
          }
      },
      plotOptions: {
          line: {
              dataLabels: {
                  enabled: false
              },
              enableMouseTracking: true
          },

          series: {
            color: 'orange'
        }
      },
      series: [{
          name: "Visitors",
          data: [0, 0, 0, 41, 31, 27]
      }]
    }
  }


  getPreviousSixMonth(){
    var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    var monthIndex = ['01','02','03','04','05','06','07','08','09','10','11','12'];
    var today = new Date();
    var d;
    var month;
    var previousSixMonths;
    var dateOfPreviousSixMonths;
    var year;


    /*Get dateIndex of previous 6 months */
    for(var i = 5; i >=0; i -= 1) {
      d = new Date(today.getFullYear(), today.getMonth() - i, 1);
      month = monthIndex[d.getMonth()];
      previousSixMonths =  monthNames[d.getMonth()];
      year = d.getFullYear();
      //console.log(month);
      //console.log(year);

      dateOfPreviousSixMonths = year+'-'+month+'-02';

      this.dateIndex = year+'-'+month+'-02';
      this.listOfPastSixMonths.push(previousSixMonths);
      this.listDateofPastSixMonths.push(dateOfPreviousSixMonths);

      //this.getActionsByMonth(month)
    }

    console.log(this.listOfPastSixMonths);
    console.log(this.listDateofPastSixMonths);
  }


}
