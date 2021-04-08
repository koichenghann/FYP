import { Component,  OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';

@Component({
  selector:'app-column-user-behavior',
  templateUrl: 'column-user-behavior.component.html',
  styleUrls: ['column-user-behavior.component.scss'],

})

export class ColumnUserBehaviorComponent implements OnInit {
  chartOptions: {};
  Highcharts = Highcharts;
  constructor() {};

  dateIndex;
  listDateofPastSixMonths = []
  listOfPastSixMonths = []
  currentYear;

  ngOnInit(){

    this.getPreviousSixMonth();

    this.chartOptions =
    {
      chart: {
          type: 'column'
      },
      title: {
          text: "User's behavior analysis "+this.currentYear
      },
      subtitle: {
          text: ''
      },
      xAxis: {
          categories: this.listOfPastSixMonths,
          crosshair: true
      },
      yAxis: {
          min: 0,
          title: {
              text: ''
          }
      },
      tooltip: {
          headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
          pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
              '<td style="padding:0"><b>{point.y:.1f} %</b></td></tr>',
          footerFormat: '</table>',
          shared: true,
          useHTML: true

      },
      plotOptions: {
          column: {
              pointPadding: 0.2,
              borderWidth: 0
          }
      },
      series: [{
          name: 'Bounce Rate',
          data: [0.0, 0.0, 0.0, 63.0, 29.0, 11.0],
          color: '#B6CEC7'
      }, /*{
          name: 'Coversion Rate',
          data: [83.6, 78.8, 98.5, 93.4, 106.0, 84.5],
          color: '#86A3C3'
      },*/ {
          name: 'Average Time On Page',
          data: [0.0, 0.0, 0.0, 25.0, 47.0, 48.5],
          color: '#7268A6'
      }, {
          name: 'Exit Rate',
          data: [0.0, 0.0, 0.0, 54.5, 25.3, 13.3],
          color: '#6B3074'
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
      this.currentYear = year;
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
