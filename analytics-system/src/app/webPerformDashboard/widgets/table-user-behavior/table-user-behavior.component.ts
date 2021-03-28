import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { Subscription } from 'rxjs';
import { FormControl, FormBuilder} from '@angular/forms';

import { MatomoService } from '../../../matomo/matomo.service';
import { UserActivityService } from '../../service/userActivity.service';
import { UserActivity } from '../../model/userActivity.model';
import { AllUserMetric } from '../../model/allUserMetric.model';


@Component({
  selector: 'app-user-behavior-table',
  templateUrl: './table-user-behavior.component.html',
  styleUrls: ['./table-user-behavior.component.scss']
})
export class TableUserBehaviorComponent implements OnInit {


  constructor(private matomoService:MatomoService, private userActivityService:UserActivityService, private formBuilder: FormBuilder) {}

  behaviorSub: Subscription;
  actionsSub: Subscription;
  activeUsersSub: Subscription;
  visitActionsSub: Subscription;
  allUserMetricByDateSub: Subscription;

  userActivityByDateSub: Subscription;
  userActivityUpdateSub: Subscription;
  allUserActivitySub: Subscription;


  //isDoneVariable
  getMetricIsDone = false;
  getUAisDone = false;


  userActivities: UserActivity[] = [];

  userBehaviorDate;
  behaviorListData;


  activityDateData;
  visitorsData;
  activeUserData;
  pageViewData;
  uniquePageViewData;
  visitActionData;
  newSignup ='0';

  getUserActivityByDateDataID;

  //object
  userActivityData;

  //userActivityByDate
  getUserActivityByDateData;

  //isDone
  pageViewAndUniqIsDone;



  selectedDate;

  date = new FormControl(new Date());

  dateForm = this.formBuilder.group({
    date: ''
  });

  isLoading = true;
  isEmpty = false;
  //dataSource = null;




  ngOnInit(): void {
    //this.getSelectedDate();

    //console.log(this.date.value);
    //this.setSelectedDate();

    /* HERE TO UNLOCK*/



    //get Behaviour data with selected date
    this.matomoService.getBehaviors(this.todayData());
    this.behaviorSub = this.matomoService.getBehaviorsRetrivedListener()
    .subscribe( (response: BehaviorList[]) => {
      this.isLoading = false;
      this.dataSource = new MatTableDataSource<BehaviorList>(response);
      console.log("Data Retrived:" ,response);
      if (response.length < 1){
        this.isEmpty = true;
      }
      this.sortAndPaginator();
      //this.setBehaviorData(response);

    },
    error => {
      this.isLoading = true;
    }
    );

    //Catch Pagination
    this.sortAndPaginator();


    this.getUserActivityMatomo(this.todayData());



  }


  ngOnDestroy() {
    this.behaviorSub.unsubscribe();
    //this.actionsSub.unsubscribe();
    //this.activeUsersSub.unsubscribe();
    //this.visitActionsSub.unsubscribe();
    this.allUserMetricByDateSub.unsubscribe();
    this.userActivityByDateSub.unsubscribe();

  }

  getSelectedDate(){
    return console.log(this.date.value);
  }

  todayData(){
    var today = new Date(),
    month = '' + (today.getMonth() + 1),
    day = '' + today.getDate(),
    year = today.getFullYear();

    if (month.length < 2)
    month = '0' + month;
    if (day.length < 2)
    day = '0' + day;

    var formattedDate = [year, month, day].join('-');
    console.log('today Date:',formattedDate);
    return formattedDate;
  }

  setSelectedDate(){
    this.isLoading = true;
    //this.isEmpty = true;

    //console.log(this.date.value);

    //Constuct data format for query
    var d = new Date(this.date.value),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;

    var formattedDate = [year, month, day].join('-');
    console.log('Selected Data:',formattedDate);

    //get Behaviour data with selected date
    this.matomoService.getBehaviors(formattedDate);
    this.behaviorSub = this.matomoService.getBehaviorsRetrivedListener()
    .subscribe( (response: BehaviorList[]) => {
      this.isLoading = false;
      this.dataSource = new MatTableDataSource<BehaviorList>(response);
      console.log("Data Retrived for user behavior:" ,response);
      if (response.length < 1){
        this.isEmpty = true;
      }
      this.sortAndPaginator();
      //this.setBehaviorData(response);

    },
    error => {
      this.isLoading = true;
    }
    );

    /* HERE TO UNLOCK
      this.getUserActivityMatomo(formattedDate);
    */
  }


  getUserActivityMatomo(selectedDate){

    /*Get user actions related metric from matomo (pageView and uniquePageView) */

    /*
    this.matomoService.getActions(selectedDate);
    this.actionsSub = this.matomoService.getActionsRetrivedListener()
    .subscribe( (response: Action)=>{
      //console.log('Pageviews: ', response.nb_pageviews);
      //console.log('Unique Pageviews: ', response.nb_uniq_pageviews);
      //console.log(JSON.stringify(response.nb_pageviews));

        //set response data
        this.pageViewData = response.nb_pageviews;
        this.uniquePageViewData = response.nb_uniq_pageviews;

        if(this.pageViewData!=undefined && this.uniquePageViewData!=undefined){
          this.pageViewAndUniqIsDone = true;
          console.log('PageViewData and UniquePageViewData set!');
          console.log(this.pageViewData, this.uniquePageViewData);
        }
        });
        */

      /*
      if(this.pageViewData!=null){
        localStorage.setItem('pagaViews', JSON.stringify(this.pageViewData.toString()));
        console.log('pageviewdata saved to localStorage');
      }
      */

      //localStorage.setItem('testVal', JSON.stringify('Test 1'));
      //console.log('Test Localstorage. Show: ',  JSON.parse(localStorage.getItem('testVal')));


    //get active users from matomo
    /*
      this.matomoService.getActiveUsers(selectedDate);
      this.activeUsersSub = this.matomoService.getActiveUsersRetrivedListener()
      .subscribe((response: activeUser)=>{

        //localStorage.setItem('activeUser', JSON.stringify(response.value));
          this.activeUserData = response.value;

      });

      //get actions value from matomo
      this.matomoService.getVisitActions(selectedDate);
      this.visitActionsSub = this.matomoService.getVisitActionsRetrivedListener()
      .subscribe((response: activeUser)=>{
        this.visitActionData = response.value;
       });


       //get number of visitor from matomo


      if(this.pageViewAndUniqIsDone){
        console.log('Date:', selectedDate);
        console.log('Visitors: ', this.visitorsData);
        console.log('Users: ', this.activeUserData);
        console.log('PageViewData:', this.pageViewData);
        console.log('UniqPageView:', this.uniquePageViewData);
        console.log('Actions: ', this.visitActionData);
        console.log('newSignup:', this.newSignup);
      }
      */


      this.activityDateData = selectedDate;
      //this.visitorsData = '3';

      this.matomoService.getAllUserMetricByDate(selectedDate);
      this.allUserMetricByDateSub = this.matomoService.getAllUserMetricByDateListener()
      .subscribe((response:AllUserMetric)=>{
        console.log('All User Metric Data of ',selectedDate,': ', response);
        console.log('Page Views:', response.nb_pageviews);
        console.log('Uniq Page Views:', response.nb_uniq_pageviews);
        console.log('Users:', response.nb_users);
        console.log('Visitors:', response.nb_visits);
        console.log('Max Action:',response.max_actions);
        console.log('Avg time on site',response.avg_time_on_site);

        this.visitorsData =  response.nb_visits;
        this.activeUserData = response.nb_users;
        this.pageViewData = response.nb_pageviews;
        this.uniquePageViewData = response.nb_uniq_pageviews;
        this.visitActionData = response.max_actions;
        this.getMetricIsDone = true;

      });

      this.createOrUpdateUserActivity(
        selectedDate,
        this.visitorsData,
        this.activeUserData,
        this.pageViewData,
        this.uniquePageViewData,
         this.visitActionData);

      if(this.getMetricIsDone){
        console.log('Get Metrics data is done!');



          //this.getMetricIsDone = false;

      }

      /*
      if(getMetricIsDone){
        if(this.visitorsData!=undefined){
          console.log('Yes VisitorData is not undefined!')
          this.createOrUpdateUserActivity(
            selectedDate,
            this.visitorsData,
            this.activeUserData,
            this.pageViewData,
            this.uniquePageViewData,
            this.visitActionData);

          //getMetricIsDone=true;
        }
      }
      */



      /*
      if(this.visitActionData!=undefined && this.activeUserData!=undefined && this.pageViewData!=undefined && this.uniquePageViewData!=undefined && this.visitorsData!=undefined){

      }
      */


  }//end of getUserActivityMatomo method


  /*auto create or update existing user activity record into database*/
  createOrUpdateUserActivity(selectedDate, visitorsData, activeUserData, pageViewData, uniquePageViewData, visitActionData){
    /*Get user activiy record by date from database*/

    this.userActivityService.getUserActivitiesByDate(selectedDate);
    this.userActivityByDateSub = this.userActivityService.getUserActivitiesByDateListener()
    .subscribe((responseData)=>{
      console.log('User activity record of ',selectedDate, ' found!');
      //this.userActivities = response;
      console.log('User Activity by date of ',selectedDate,'. Result: ', JSON.stringify(responseData));
      console.log('user activity id: ', JSON.stringify(responseData[0]._id));

      this.getUserActivityByDateDataID = responseData[0]._id;
      this.getUserActivityByDateData = responseData;
      this.getUAisDone = true;




      /*
      if(response && selectedDate && this.visitorsData && this.activeUserData && this.pageViewData && this.uniquePageViewData && this.visitActionData){
          this.createOrUpdateUserActivity(response, selectedDate, this.visitorsData, this.activeUserData,this.pageViewData,this.uniquePageViewData,this.visitActionData);
      }
      */

    });

    console.log('Get UA is done. Proceed to AddOrUpdate record.');
        this.AddOrUpdateResolver(
          this.getUserActivityByDateData,
          selectedDate,
          visitorsData,
          activeUserData,
          pageViewData,
          uniquePageViewData,
          visitActionData);
          //this.getUAisDone=false;


          /*
    if(this.getUAisDone){



    }*/

  }

  AddOrUpdateResolver(getUserActivityByDateData,selectedDate, visitorsData, activeUserData, pageViewData, uniquePageViewData, visitActionData){
    if(getUserActivityByDateData.length==0){
      //Add new activity data if no exisiting data
      console.log('No User Activity found on selected date!');
      console.log('Creating new user activity data');

      console.log('Checking before Add new record. Selected data:', selectedDate, 'Visitors: ', visitorsData
      ,'Users: ', activeUserData, 'Page View: ', pageViewData, 'Uniq Page view: ', uniquePageViewData, 'Max Action:'
      , visitActionData);

      this.userActivityService.addUserActivity(
        selectedDate,
        visitorsData,
        activeUserData,
        pageViewData,
        uniquePageViewData,
        visitActionData
        );

    }
    else{
      //update activity data for the targetted date
      console.log('Proceed to update user activity data!');
      console.log('ID received: ',this.getUserActivityByDateData[0]._id);
      //console.log('user activity id: ', JSON.stringify(responseData._id));

      console.log('Checking before update. Selected data:', selectedDate, 'Visitors: ', visitorsData
      ,'Users: ', activeUserData, 'Page View: ', pageViewData, 'Uniq Page view: ', pageViewData, 'Max Action:'
      , visitActionData);
      this.userActivityService.updateUserActivity(
        this.getUserActivityByDateDataID,
        selectedDate,
        visitorsData,
        activeUserData,
        pageViewData,
        uniquePageViewData,
        visitActionData,
        this.newSignup
      );
    }
  }



  displayedColumns: string[] = ['url', 'bounce_rate', 'exit_rate', 'avg_time_on_page', 'avg_page_load_time'];
  dataSource = new MatTableDataSource<BehaviorList>();


  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  sortAndPaginator() {
    setTimeout(() => {
      this.dataSource.paginator = this.paginator
    }
    );
    setTimeout(() => this.dataSource.sort = this.sort);
  }


  /*
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  */


  setBehaviorData(response){
    this.behaviorListData = response;
  }

  getBehaviorData(){
    return this.behaviorListData;
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

export interface Action{
  nb_downloads: number,
  nb_keywords: number,
  nb_outlinks: number,
  nb_pageviews: number,
  nb_searches: number,
  nb_uniq_downloads: number,
  nb_uniq_outlinks: number,
  nb_uniq_pageviews: number,
}

export interface activeUser{
  value: number
}

export interface visitAction{
  value: number
}

export interface UserActivityFromDatabase{
  _id: string,
  date: string,
  visitors: string,
  users: string,
  pageView: string,
  uniquePageView: string,
  newSignUp: string,
  actions: string,
  _v: string
}



//const behaviorList: BehaviorList[] = [{"label":"\/manager-dashboard","nb_visits":9,"nb_uniq_visitors":3,"nb_hits":11,"sum_time_spent":2027,"nb_hits_with_time_server":"1","min_time_server":"0.0010","max_time_server":"0.0010","entry_nb_uniq_visitors":"2","entry_nb_visits":"8","entry_nb_actions":"10","entry_sum_visit_length":"1607","entry_bounce_count":"6","exit_nb_uniq_visitors":"2","exit_nb_visits":"8","avg_time_server":0.001,"avg_page_load_time":0.001,"avg_time_on_page":184,"bounce_rate":"75%","exit_rate":"89%","url":"http:\/\/localhost:4200\/manager-dashboard","segment":"pageUrl==http%253A%252F%252Flocalhost%253A4200%252Fmanager-dashboard"},{"label":"\/home","nb_visits":3,"nb_uniq_visitors":3,"nb_hits":5,"sum_time_spent":162,"nb_hits_with_time_server":"1","min_time_server":"0.0010","max_time_server":"0.0010","entry_nb_uniq_visitors":"3","entry_nb_visits":"3","entry_nb_actions":"6","entry_sum_visit_length":"586","entry_bounce_count":"1","exit_nb_uniq_visitors":"3","exit_nb_visits":"3","avg_time_server":0.001,"avg_page_load_time":0.001,"avg_time_on_page":32,"bounce_rate":"33%","exit_rate":"100%","url":"http:\/\/localhost:4200\/home","segment":"pageUrl==http%253A%252F%252Flocalhost%253A4200%252Fhome"},{"label":"\/index","nb_visits":3,"nb_uniq_visitors":4,"nb_hits":5,"sum_time_spent":1176,"nb_hits_with_time_server":"0","min_time_server":null,"max_time_server":null,"entry_nb_uniq_visitors":"3","entry_nb_visits":"3","entry_nb_actions":"5","entry_sum_visit_length":"1177","entry_bounce_count":"2","exit_nb_uniq_visitors":"3","exit_nb_visits":"3","avg_time_server":0,"avg_page_load_time":0,"avg_time_on_page":235,"bounce_rate":"67%","exit_rate":"100%","url":"http:\/\/localhost:4200\/","segment":"pageUrl==http%253A%252F%252Flocalhost%253A4200%252F"}];


/*

export interface Source {
  url:  string,
  bounceRate: string,
  exitRate: string,
  averageOnTime: string,
  icon: string
  performance: string
}

const sources: Source[] = [
  {url: 'merchant.help/product/club', bounceRate: '3.8%',  exitRate:'35.8%', averageOnTime:  '4m12s' , icon: 'fas fa-caret-up',performance:'4.3%'},
  {url:  'merchant.help/product', bounceRate: '7.6%',  exitRate: '17.6%', averageOnTime:  '3m22s', icon: 'fas fa-caret-up',performance:'2.5%'},
  {url:  'merchant.help/item', bounceRate: '12.8%',  exitRate: '12.8%', averageOnTime:  '1m12s', icon: 'fas fa-caret-down',performance:'0.7%'},
  {url:  'merchant.help/home', bounceRate: '9.6%',  exitRate: '9.6%', averageOnTime:  '5m25s', icon: 'fas fa-caret-down',performance:'5.6%'},
  {url:  'merchant.help/product/detail', bounceRate: '9.2%',  exitRate:'9.2%', averageOnTime: '6m21s', icon: 'fas fa-caret-up',performance:'2.3%'},
  {url:  'merchant.help/item/detail', bounceRate:'8.4%',  exitRate: '8.4%', averageOnTime: '4m12s', icon: 'fas fa-caret-down',performance:'5.7%'},
  {url:  'merchant.help/about-us', bounceRate: '4.3%',  exitRate: '4.3%', averageOnTime:  '3m43s', icon: 'fas fa-caret-up',performance:'4.3%'},
  {url:  'merchant.help/contact', bounceRate: '4.3%',  exitRate: '4.3%', averageOnTime: '4m23s', icon: 'fas fa-caret-up',performance:'8.3%'},
  {url:  'merchant.help/address', bounceRate: '4.3',  exitRate:'4.3%', averageOnTime:  '1m12s', icon: 'fas fa-caret-up',performance:'3.4%'},
  {url:  'merchant.help/club', bounceRate: '4.3%',  exitRate:'4.3%', averageOnTime:  '1m04s', icon: 'fas fa-caret-up',performance:'6.1%'}

];
*/
