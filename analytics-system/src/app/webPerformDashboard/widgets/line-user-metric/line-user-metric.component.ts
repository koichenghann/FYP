import { Component,  OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';

@Component({
  selector:'app-line-user-metric',
  templateUrl: 'line-user-metric.component.html',
  styleUrls: ['line-user-metric.component.scss'],

})

export class LineUserMetricComponent implements OnInit {
  chartOptions: {};
  Highcharts = Highcharts;
  constructor() {};

  dateIndex;
  listDateofPastSixMonths = []
  listOfPastSixMonths = []
  currentYear;



  ngOnInit(){

    this.getPreviousSixMonth();

    this.chartOptions ={


      title: {
          text: "User's activities analysis "+this.currentYear
      },

      subtitle: {
          text: ''
      },

      yAxis: {
          title: {
              enabled: false
          }
      },

      xAxis: {
        categories: this.listOfPastSixMonths,
      },

      legend: {
          layout: 'vertical',
          align: 'right',
          verticalAlign: 'middle'
      },

      plotOptions: {
          series: {
              label: {
                  connectorAllowed: false
              },

          }
      },

      series: [{
          name: 'Visitors',
          data: [0, 0, 0, 41, 31, 27],
          color:'#FFCF6A'
      }, {
          name: 'Actions',
          data: [0, 0, 0, 71, 157, 414],
          color: '#FFBC6A'
      }, {
          name: 'Uniq. Pageviews',
          data: [0, 0, 0, 51, 83, 117],
          color: '#FF965B'
      }, {
          name: 'Sign-Up Users',
          data: [0, 0, 0, 2, 3, 7],
          color: '#FF6D6A'
      }],

      responsive: {
          rules: [{
              condition: {
                  maxWidth: 500
              },
              chartOptions: {
                  legend: {
                      layout: 'horizontal',
                      align: 'center',
                      verticalAlign: 'bottom'
                  }
              }
          }]
      }

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
