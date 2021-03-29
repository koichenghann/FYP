import { Component, OnInit} from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MatomoService } from '../../matomo/matomo.service';
import { TodayVisitor } from '../../matomo/todayVisitor.model';
import { Subscription } from 'rxjs';


@Component({
  selector:'user-track',
  templateUrl:'user-track.component.html',
  styleUrls: ['user-track.component.scss'],
})

export class UserTrackComponent implements OnInit{
  constructor(private matomoService:MatomoService, private http: HttpClient){}

  //numOfVisitors;
  todayVisitorSub: Subscription;
  yesterdayVisitorSub: Subscription;

  todayActionsSub: Subscription;
  yesterdayActionsSub: Subscription;

  behaviorSub: Subscription;





  //todayVisitor: TodayVisitor[] = [];
  //Number of Today and Yesterday Visitor
  todayVisitor: number;
  yesterdayVisitor: number;

   //Number of Today and Yesterday Action
  todayAction: number;
  yesterdayAction: number;

  todayBehaviorList: BehaviorList[] =[];
  yesterdayBehaviorList: BehaviorList[] =[];

  //today user behavior summary
  todayBounceRate;
  todayExitRate;
  todayAvgTimeOnPage;
  todayConvrtRate;

  yesterdayBounceRate;
  yesterdayExitRate;
  yesterdayAvgTimeOnPage;
  yesterdayConvrtRate;

  ytdVisitVal: number;
  tdyVisitVal: number;
  ytdActionVal: number;
  tdyActionVal: number;
  visitPercent: string;
  actionPercent: string;
  arrow: string;
  arrowAct: string;
  todayDate: Date = new Date();

  ngOnInit(): void{

    //console.log(this.matomoService.getNumOfVisitors());
    //this.matomoService.getTodayVisits();

    //var numOfVisitors = this.matomoService.getVisitsRetrievedListener();

    //console.log('Number of Visitors:', this.matomoService.getTodayVisits());

    this.matomoService.getTodayVisits();
    this.matomoService.getYesterdayVisits();

    this.matomoService.getTodayActions();
    this.matomoService.getYesterdayActions();



    this.getBounceVal;

    this.todayVisitorSub = this.matomoService.getTodayVisitsRetrievedListener()
    .subscribe( (response: number) => {
      console.log("Today's Visitor:" + response);
      this.todayVisitor = response;

      setTimeout(() => this.todayVisitor  = this.todayVisitor);
      //this.tdyVisitVal = this.todayVisitor;
      //this.setTdyVisit(response);
      this.calVisitorPercent();
      //console.log(this.todayVisitor);

    });

    this.yesterdayVisitorSub = this.matomoService.getYesterdayVisitsRetrievedListener()
    .subscribe( (response: number) => {
      console.log("Yesterday's Visitor:" + response);
      this.yesterdayVisitor = response;
      //this.setYtdVisit(response);

      setTimeout(() => this.yesterdayVisitor = this.yesterdayVisitor);
      //this.ytdVisitVal = this.yesterdayVisitor;

      //console.log(this.ytdVisitVal);
    });

    this.todayActionsSub = this.matomoService.getTodayActionsRetrievedListener()
    .subscribe( (response: number) => {
      console.log("Today's Action:" + response);
      this.todayAction = response;
      setTimeout(() => this.todayAction= this.todayAction);
      //this.tdyActionVal = this.todayAction;
      //this.setTdyAction(response);


      //console.log(this.todayAction);
    });

    this.yesterdayActionsSub = this.matomoService.getYesterdayActionsRetrievedListener()
    .subscribe( (response: number) => {
      console.log("Yesterday's Action:" + response);
      this.yesterdayAction = response;
      setTimeout(() => this.yesterdayAction= this.yesterdayAction);
     // this.ytdActionVal = this.yesterdayAction;
      //this.setYtdAction(response);

      this.calActionPercent();
      console.log(this.yesterdayAction);
    });




    var d = new Date(),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;

    var formattedDate = [year, month, day].join('-');
    console.log(formattedDate);

    this.matomoService.getBehaviors(formattedDate);
    this.behaviorSub = this.matomoService.getBehaviorsRetrivedListener()
    .subscribe( (response) => {
      //this.dataSource = new MatTableDataSource<BehaviorList>(response);
      this.todayBehaviorList = response;

      //assign value to each metric
      this.setBounceVal(this.todayBehaviorList[0].bounce_rate);


      this.todayAvgTimeOnPage = this.todayBehaviorList[0].avg_time_on_page;
      this.todayExitRate = this.todayBehaviorList[0].exit_rate;

      //console.log("Today Index Page:" , this.behaviorList[0].bounce_rate);
      //this.setBehaviorData(response);

    });

    var yesterdayDate = this.matomoService.getYesterdayDate();
    this.matomoService.getBehaviors(yesterdayDate);
    this.behaviorSub = this.matomoService.getBehaviorsRetrivedListener()
    .subscribe( (response) => {
      //this.dataSource = new MatTableDataSource<BehaviorList>(response);
      this.yesterdayBehaviorList = response;

      //assign value to each metric
      this.yesterdayBounceRate =this.yesterdayBehaviorList[1].bounce_rate;
      this.yesterdayAvgTimeOnPage = this.yesterdayBehaviorList[1].avg_time_on_page;
      this.yesterdayExitRate = this.yesterdayBehaviorList[1].exit_rate;

      //console.log("Yesterday Index Page:" , this.behaviorList[1].bounce_rate);
      //this.setBehaviorData(response);

    });



    console.log('Yesterday date:' ,this.matomoService.getYesterdayDate());


  }

  /*

  setYtdAction(data){
    this.ytdActionVal = data;
  }

  getYtdAction(){
    return this.ytdActionVal;
  }

  setTdyAction(data){
    this.tdyActionVal = data;
  }

  getTydAction(){
    return this.tdyActionVal;
  }

  setYtdVisit(data){
    this.ytdVisitVal = data;
  }

  getYtdVisit(){
    return this.ytdVisitVal;
  }

  setTdyVisit(data){
    this.tdyVisitVal = data;
  }

  getTydVisit(){
    return this.tdyVisitVal;
  }

  */

  //getter for each metric


  //setter for each metric
  setBounceVal(data){
    this.todayBounceRate = data;
  }


  getBounceVal(){
    return this.todayBounceRate;
  }

  //Calculate for Visitor Percentage
  calVisitorPercent(){
     //var a =  this.getTydVisit();
     //var b = this.getYtdVisit();
     var a = this.todayVisitor;
     var b = this.yesterdayVisitor;
     var c = (a/b * 100) - 100
     this.visitPercent = c.toFixed(1);

     if (c < 0.0){
      this.arrow="fas fa-caret-down fas_icon_3";
     }
     else if (c > 0.0){
      this.arrow="fas fa-caret-up";
     }
     else{
      this.arrow="";
     }

    console.log("Calculated: ",this.visitPercent);

  }

  //Calculate for Action Percentage
  calActionPercent(){
    //var a =  this.getTydAction();
    //var b = this.getYtdAction();
    var a = this.todayAction;
    var b = this.yesterdayAction;
    var c = (a/b * 100) - 100
    this.actionPercent = c.toFixed(1);

    if (c < 0.0){
     this.arrowAct="fas fa-caret-down fas_icon_3";
    }
    else if (c > 0.0){
     this.arrowAct="fas fa-caret-up";
    }
    else{
     this.arrowAct="";
    }
   console.log("Calculated action: ",this.actionPercent);
 }



  ngOnDestroy() {
    this.todayVisitorSub.unsubscribe();
    this.yesterdayVisitorSub.unsubscribe();
    this.behaviorSub.unsubscribe();
  }





}

export interface BehaviorList{
  avg_page_load_time: number,
  avg_time_on_page: number,
  avg_time_server: number,
  bounce_rate: string,
  entry_bounce_count: string,
  entry_nb_actions: string,
  entry_nb_uniq_visitors: string,
  entry_nb_visits: string,
  entry_sum_visit_length: string,
  exit_nb_uniq_visitors: string,
  exit_nb_visits: string,
  exit_rate: string,
  label: string,
  max_time_server: string,
  min_time_server: string,
  nb_hits: number,
  nb_hits_with_time_server: string,
  nb_uniq_visitors: number,
  nb_visits: number,
  segment: string,
  sum_time_spent: number,
  url: string,
}
