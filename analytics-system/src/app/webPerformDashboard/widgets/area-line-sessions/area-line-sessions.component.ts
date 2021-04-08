import { Component,  OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { Subject } from 'rxjs';

@Component({
  selector:'app-widget-area-line-sessions',
  templateUrl: 'area-line-sessions.component.html',
  styleUrls: ['area-line-sessions.component.scss'],

})

export class AreaLineSessionsComponent implements OnInit {
  chartOptions: {};
  Highcharts = Highcharts;
  constructor(

    private http: HttpClient,
    //private subscription:Subscription

    ) {};

    private actionsByMonthListener = new Subject<any>();
    actionsByMonthSub: Subscription;

    dateIndex;
    listDateofPastSixMonths = []
    listOfPastSixMonths = []


  ngOnInit(): void{

    this.getPreviousSixMonth();

    /*Call to get each month's actions */
    /*
    for(var j=0; j<this.listDateofPastSixMonths.length; j++){
      this.getActionsByMonth(this.listDateofPastSixMonths[j]);
      this.actionsByMonthSub = this.getActionsByMonthListener()
      .subscribe((res)=>{
        if(res!=null){
          console.log('Date: '+this.listDateofPastSixMonths[j], 'response:',res);
        }

      })
    }*/






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
          categories: this.listOfPastSixMonths
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
          name: "Actions",
          data: [0, 0, 0, 71, 157, 414]
      }]
    }


    //


  }


  getActionsByMonth(dateIndex){
    this.http.get<any>(
      'http://localhost/matomo/?module=API&method=VisitsSummary.getUsers&idSite=1&period=month&date='+dateIndex+'&format=json&token_auth=e7e134eae39f79244e27fc2eea5e76bb'
      ).subscribe(res => {
        //console.log('MetricsByProductName:', res);
        this.actionsByMonthListener.next(res);
    })
  }

  getActionsByMonthListener() {
    return this.actionsByMonthListener.asObservable();
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

  ngOnDestroy() {
    //this.actionsByMonthSub.unsubscribe();
  }



}
