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


  //todayVisitor: TodayVisitor[] = [];
  todayVisitor: number;
  yesterdayVisitor: number;
  todayAction: number;
  yesterdayAction: number;

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

    this.todayVisitorSub = this.matomoService.getTodayVisitsRetrievedListener()
    .subscribe( (response: number) => {
      console.log("Today's Visitor:" + response);
      this.todayVisitor = response;
      this.tdyVisitVal = this.todayVisitor;
      this.setTdyVisit(response);

      //console.log(this.todayVisitor);

    });

    this.yesterdayVisitorSub = this.matomoService.getYesterdayVisitsRetrievedListener()
    .subscribe( (response: number) => {
      console.log("Yesterday's Visitor:" + response);
      this.yesterdayVisitor = response;
      this.setYtdVisit(response);
      this.ytdVisitVal = this.yesterdayVisitor;
      this.calVisitorPercent();
      //console.log(this.ytdVisitVal);
    });

    this.todayActionsSub = this.matomoService.getTodayActionsRetrievedListener()
    .subscribe( (response: number) => {
      console.log("Today's Action:" + response);
      this.todayAction = response;
      this.tdyActionVal = this.todayAction;
      this.setTdyAction(response);


      //console.log(this.todayAction);
    });

    this.yesterdayActionsSub = this.matomoService.getYesterdayActionsRetrievedListener()
    .subscribe( (response: number) => {
      console.log("Yesterday's Action:" + response);
      this.yesterdayAction = response;
      this.ytdActionVal = this.yesterdayAction;
      this.setYtdAction(response);
      this.calActionPercent();
      console.log(this.yesterdayAction);
    });











  }

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

  calVisitorPercent(){
     var a =  this.getTydAction();
     var b = this.getYtdVisit();
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


  calActionPercent(){
    var a =  this.getTydAction();
    var b = this.getYtdAction();
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
  }





}
