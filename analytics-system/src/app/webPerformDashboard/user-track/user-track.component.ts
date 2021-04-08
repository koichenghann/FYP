import { Component, OnInit} from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MatomoService } from '../../matomo/matomo.service';
import { TodayVisitor } from '../../matomo/todayVisitor.model';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DatePipe } from '@angular/common';



@Component({
  selector:'user-track',
  templateUrl:'user-track.component.html',
  styleUrls: ['user-track.component.scss'],
})

export class UserTrackComponent implements OnInit{
  constructor(private matomoService:MatomoService, private http: HttpClient, public dialog: MatDialog){ }

  openDialog() {
    this.dialog.open(DialogPlatform);
  }

  //numOfVisitors;


  /*Subscription Variables */
  allUserActivityMatomoSub: Subscription;
  behaviorSub: Subscription;
  platformBrowser: Subscription;
  platformOS: Subscription;


  /*Number of Today and Yesterday Visitor*/
  todayVisitor: number;
  yesterdayVisitor: number;

   /*Number of Today and Yesterday Action*/
  todayAction: number;
  yesterdayAction: number;

  /*Number of new signed up */
  todayNewSignedUp: number;
  yesterdayNewSignedUp: number;


  todayBehaviorList: BehaviorList[] =[];
  yesterdayBehaviorList: BehaviorList[] =[];

  /*Variable of today's user behavior summary*/
  todayBounceRate;
  todayDirectEntry;
  todayAvgTimeOnSite;

  /*Variable of yesterday's user behavior summary*/
  yesterdayBounceRate;
  yesterdayDirectEntry;
  yesterdayAvgTimeOnSite;

  /*Calculated Percentange */
  visitPercent: string;
  actionPercent: string;
  signedUpPercent: string;
  bouncePercent: string;
  directPercent: string;
  onSitePercent: string;

  /* Icon dynamically */
  arrow: string;
  arrowAct: string;
  arrowSignup: string;
  arrowBounce: string;
  arrowDirect: string;
  arrowOnSite: string;

  /*Get today date */
  todayDate: Date = new Date();

  /**Spinner */
  isLoading = true;


  ngOnDestroy() {
    //this.todayVisitorSub.unsubscribe();
    //this.yesterdayVisitorSub.unsubscribe();
    //this.behaviorSub.unsubscribe();
    this.allUserActivityMatomoSub.unsubscribe();
  }

  ngOnInit(): void{
    //console.log(this.matomoService.getNumOfVisitors());
    //this.matomoService.getTodayVisits();

    //var numOfVisitors = this.matomoService.getVisitsRetrievedListener();

    //console.log('Number of Visitors:', this.matomoService.getTodayVisits());
    this.getMetricData();
    console.log('Yesterday date:' ,this.matomoService.getYesterdayDate());
  }



  getMetricData(){
    this.matomoService.getAllUserMetricByMatomo(this.matomoService.getYesterdayDate(), this.matomoService.getTodayDate());
    this.allUserActivityMatomoSub = this.matomoService.getAllUserMetricByMatomoListener()
    .subscribe((res)=>{
      console.log('All User Activity Data from Matomo: ', res);
      console.log(Object.keys(res));
      //console.log(res['2021-03-22']);



      if(res!=undefined){
        this.isLoading = false;

        var userActivityModified = [];

        var keyOfUA = Object.keys(res);

        var dateWithRecord = [];
        var exisitingUserActivity = []

        /*Converting JSON data to usable data*/
        for(var i in res){

          userActivityModified.push(res[i]);

        }

        for(var i in userActivityModified){
          if(!Array.isArray(userActivityModified[i])){
            dateWithRecord.push(keyOfUA[i]);
          }
        }

        for (var i in userActivityModified){
          if(!Array.isArray(userActivityModified[i])){

            console.log('Adding Item:',userActivityModified[i]);
            exisitingUserActivity.push(userActivityModified[i]);
            //exisitingUserActivity[i].data['date'] =  keyOfUA[i];
          }

        }

        for (var i in exisitingUserActivity){
          exisitingUserActivity[i] = Object.assign(exisitingUserActivity[i], {date:dateWithRecord[i]});
        }

        //this.dataSource = new MatTableDataSource<AllUserMetricMatomo>(exisitingUserActivity);
        //this.sortAndPaginator();

        //console.log('After Modified: ',userActivityModified);
        //console.log('Converted of Key:', keyOfUA);
        //console.log('First item of Data:',keyOfUA[0]);
        console.log('Remove empty array record:', exisitingUserActivity);
        //console.log('Date with Record: ', dateWithRecord);
        //console.log('Detect Array:',Array.isArray(userActivityModified[2]));

        /*To detect empty list of yesterday, if yesterday = [ ] */
        if(exisitingUserActivity.length<2){
          console.log('Yesteryday No data: True!');
            /** -- Set data to dashboard -- */
          /*Number of Visitors */
          this.todayVisitor = exisitingUserActivity[0].nb_visits;
          this.yesterdayVisitor = 0;
          console.log('Today visitor:', this.todayVisitor);

          /*Number of Actions */
          this.todayAction = exisitingUserActivity[0].nb_actions;
          this.yesterdayAction = 0


          /*Number of new signed-up*/
          this.todayNewSignedUp = exisitingUserActivity[0].nb_users_new
          this.yesterdayNewSignedUp = 0;



          /*Bounce rate */
          this.todayBounceRate = exisitingUserActivity[0].bounce_rate;
          this.yesterdayBounceRate = "No Record";
          //console.log(exisitingUserActivity[1].bounce_rate);
          //console.log(exisitingUserActivity[0].bounce_rate);

          /*Direct Entry */
          this.todayDirectEntry = exisitingUserActivity[0].Referrers_visitorsFromDirectEntry_percent;
          this.yesterdayDirectEntry = "No Record"

          /*Average on time site */
          this.todayAvgTimeOnSite = exisitingUserActivity[0].avg_time_on_site;
          this.yesterdayAvgTimeOnSite = "No Record";

        }
        else{
          console.log('Yes No data: False!');
           /** -- Set data to dashboard -- */
          /*Number of Visitors */
          this.todayVisitor = exisitingUserActivity[1].nb_visits;
          this.yesterdayVisitor = exisitingUserActivity[0].nb_visits;
          console.log('Today visitor:', this.todayVisitor);

          /*Number of Actions */
          this.todayAction = exisitingUserActivity[1].nb_actions;
          this.yesterdayAction = exisitingUserActivity[0].nb_actions;


          /*Number of new signed-up*/
          if(exisitingUserActivity[0].nb_users_new==null){
            this.yesterdayNewSignedUp = 0;
          }
          else{
            this.yesterdayNewSignedUp = exisitingUserActivity[0].nb_users_new;
          }

          if(exisitingUserActivity[1].nb_users_new==null){
            this.todayNewSignedUp = 0;
          }
          else{
            this.todayNewSignedUp = exisitingUserActivity[1].nb_users_new;
          }

          /*Bounce rate */
          this.todayBounceRate = exisitingUserActivity[1].bounce_rate;
          this.yesterdayBounceRate = exisitingUserActivity[0].bounce_rate;
          //console.log(exisitingUserActivity[1].bounce_rate);
          //console.log(exisitingUserActivity[0].bounce_rate);

          /*Direct Entry */
          this.todayDirectEntry = exisitingUserActivity[1].Referrers_visitorsFromDirectEntry_percent;
          this.yesterdayDirectEntry = exisitingUserActivity[0].Referrers_visitorsFromDirectEntry_percent;

          /*Average on time site */
          this.todayAvgTimeOnSite = exisitingUserActivity[1].avg_time_on_site;
          this.yesterdayAvgTimeOnSite = exisitingUserActivity[0].avg_time_on_site;

       }



        /*Calculation of Visitors */
        this.calVisitorPercent(this.yesterdayVisitor, this.todayVisitor);

        /*Calculation of Actions */
        this.calActionPercent(this.yesterdayAction, this.todayAction);

        /*Calculation of New Signed-up */
        this.calNewSignUpPercent(this.yesterdayNewSignedUp, this.todayNewSignedUp)

        /*Calculation of Bounce Rate */
        this.calBouncePercent(this.yesterdayBounceRate, this.todayBounceRate);

        /*Calculation of Direct Entry*/
        this.calDirectEntryPercent(this.yesterdayDirectEntry, this.todayDirectEntry);

        /*Calculation of Average time on site */
        this.calAvgTimeOnSitePercent(this.yesterdayAvgTimeOnSite, this.todayAvgTimeOnSite);

      }


      //this.dataSource = new MatTableDataSource<any>(Object.keys(res));

    });
  }

  /*Calculate for Visitor Percentage*/
  calVisitorPercent(yesterdayVisitor, todayVisitor){
     //var a =  this.getTydVisit();
     //var b = this.getYtdVisit();

     var a = todayVisitor;
     var b = yesterdayVisitor;
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

  /*Calculate for Action Percentage*/
  calActionPercent(yesterdayAction, todayAction){
    //var a =  this.getTydAction();
    //var b = this.getYtdAction();
    var a = todayAction;
    var b = yesterdayAction;
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

  //Calculate for New signed-up Percentage
  calNewSignUpPercent(yesterdayNewSignedUp, todayNewSignedUp){
    //var a =  this.getTydAction();
    //var b = this.getYtdAction();
    var a = todayNewSignedUp;
    var b = yesterdayNewSignedUp;
    var c = (a/b * 100) - 100
    this.signedUpPercent = c.toFixed(1);

    if (c < 0.0){
      this.arrowSignup="fas fa-caret-down fas_icon_3";
    }
    else if (c > 0.0){
     this.arrowSignup="fas fa-caret-up";
    }
    else{
     this.arrowSignup="";
    }
   console.log("Calculated New Signup: ",this.signedUpPercent);
 }

  //Calculate for New signed-up Percentage
  calBouncePercent(yesterdayBounceRate, todayBounceRate){
    //var a =  this.getTydAction();
    //var b = this.getYtdAction();
    var a = parseFloat(todayBounceRate);
    var b = parseFloat(yesterdayBounceRate);
    var c = (a/b * 100) - 100;

    if(c==NaN){
      this.bouncePercent = '0';
    }
    else{
      this.bouncePercent = c.toFixed(1);
    }


    if (c < 0.0){
      this.arrowBounce="fas fa-caret-down fas_icon_3";
    }
    else if (c > 0.0){
    this.arrowBounce="fas fa-caret-up";
    }
    else if (c==NaN){
      this.arrowBounce="fas fa-caret-down fas_icon_3";
    }
    else{
    this.arrowBounce="";
    }
  console.log("Calculated Bounce Rate: ",this.bouncePercent);
  }

   /*Calculate for Direct Entry Percentage*/
   calDirectEntryPercent(yesterdayDirectEntry, todayDirectEntry){
    //var a =  this.getTydAction();
    //var b = this.getYtdAction();
    var a = parseFloat(todayDirectEntry);
    var b = parseFloat(yesterdayDirectEntry);
    var c = (a/b * 100) - 100;

    if(c==NaN){
      this.directPercent = '0';
    }
    else{
      this.directPercent = c.toFixed(1);
    }


    if (c < 0.0){
      this.arrowDirect="fas fa-caret-down fas_icon_3";
    }
    else if (c > 0.0){
    this.arrowDirect="fas fa-caret-up";
    }
    else if (c==NaN){
      this.arrowDirect="fas fa-caret-down fas_icon_3";
    }
    else{
    this.arrowDirect="";
    }
  console.log("Calculated Bounce Rate: ",this.directPercent);
  }

  /*Calculate for Direct Entry Percentage*/
  calAvgTimeOnSitePercent(yesterdayAvgTimeOnSite, todayAvgTimeOnSite){
    //var a =  this.getTydAction();
    //var b = this.getYtdAction();
    var a = parseFloat(todayAvgTimeOnSite);
    var b = parseFloat(yesterdayAvgTimeOnSite);
    var c = (a/b * 100) - 100;

    if(c==NaN){
      this.onSitePercent = '0';
    }
    else{
      this.onSitePercent = c.toFixed(1);
    }


    if (c < 0.0){
      this.arrowOnSite="fas fa-caret-down fas_icon_3";
    }
    else if (c > 0.0){
    this.arrowOnSite="fas fa-caret-up";
    }
    else if (c==NaN){
      this.arrowOnSite="fas fa-caret-down fas_icon_3";
    }
    else{
    this.arrowOnSite="";
    }
  console.log("Calculated Bounce Rate: ",this.onSitePercent);
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

@Component({
  selector: 'platform-dialog',
  templateUrl: './platform-dialog.html',
  styleUrls: ['./platform-dialog.scss'],
})
export class DialogPlatform implements OnInit {

  constructor(private matomoService:MatomoService){ }
   /*Subscription Variables */
  platformBrowserSub: Subscription;
  platformOSSub: Subscription;

  isLoading;
  firstLoad;

  todayDate;


  displayedColumns: string[] = ['logo','label','visitors'];
  dataSource = new MatTableDataSource<any>();

  displayedColumnsOS: string[] = ['logo','label','visitors'];
  dataSourceOS = new MatTableDataSource<any>();

  ngOnInit(): void{
    this.getPlatformBrowser();
    this.getPlatformOS();

    this.todayDate = this.matomoService.getTodayDate();
  }

  ngOnDestroy() {
    this.platformOSSub.unsubscribe();
    this.platformBrowserSub.unsubscribe();
    //this.behaviorSub.unsubscribe();
    //this.allUserActivityMatomoSub.unsubscribe();
  }

  getPlatformOS(){
    this.matomoService.getPlatformOS(this.matomoService.getTodayDate());
    this.platformOSSub = this.matomoService.getPlatformOSListener()
    .subscribe((res)=>{
      console.log('Platform Browser:', res);
      this.dataSourceOS = new MatTableDataSource<any>(res);

    });
  }

  getPlatformBrowser(){
    this.matomoService.getPlatformBrowser(this.matomoService.getTodayDate());
    this.platformBrowserSub = this.matomoService.getPlatformBrowserListener()
    .subscribe((res)=>{
      console.log('Platform OS:', res);
      this.dataSource = new MatTableDataSource<any>(res);

    });
  }
}

/* ----  Old coding codes ---- */

    /*Old variables */
      /*
      todayVisitorSub: Subscription;
      yesterdayVisitorSub: Subscription;
      todayActionsSub: Subscription;
      yesterdayActionsSub: Subscription;
     */


      /*Unused variable */
      //ytdVisitVal: number;
      //tdyVisitVal: number;
      //ytdActionVal: number;
      //tdyActionVal: number;


    /*
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

    */

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

    /*

  //getter for each metric

  getBounceVal(){
    return this.todayBounceRate;
  }

  //setter for each metric
  setBounceVal(data){
    this.todayBounceRate = data;
  }

  */
