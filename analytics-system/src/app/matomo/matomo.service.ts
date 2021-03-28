import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class MatomoService {
  constructor(private http: HttpClient, private router:Router) { }

  private todayVisitsRetrievedListener = new Subject<any>();
  private yesterdayVisitsRetrievedListener = new Subject<any>();
  private todayActionsRetrievedListener = new Subject<any>();
  private yesterdayActionsRetrievedListener = new Subject<any>();

  private behavioursRetrievedListener = new Subject<any>();
  private actionsRetrievedListener = new Subject<any>();
  private activeUsersRetrievedListener = new Subject<any>();
  private visitActionsRetrievedListener = new Subject<any>();

  private allUserMetricByDateListener = new Subject<any>();



  /*Device Platform Metric */
  getDevices(){
    this.http.get<any>('http://localhost/matomo/?module=API&method=DevicesDetection.getModel&idSite=1&period=month&date=today&format=json&token_auth=ceaaf0c1264ab574e8fecd343feabe46')
    .subscribe(response => {
        console.log(response);
    })
  }

  /*Today's visitor number */
  getTodayVisits(){
    this.http.get<any>('http://localhost/matomo/?module=API&method=VisitsSummary.getVisits&idSite=1&period=day&date=today&format=json&token_auth=ceaaf0c1264ab574e8fecd343feabe46')
    .subscribe(res => {
      console.log(res['value']);
      this.todayVisitsRetrievedListener.next(res['value']);
    })
  }

  getTodayVisitsRetrievedListener() {
    return this.todayVisitsRetrievedListener.asObservable();
  }

  /*Yesterday's visitor number */
  getYesterdayVisits(){
    this.http.get<any>('http://localhost/matomo/?module=API&method=VisitsSummary.getVisits&idSite=1&period=day&date=yesterday&format=json&token_auth=ceaaf0c1264ab574e8fecd343feabe46')
    .subscribe(res => {
      console.log(res['value']);
      this.yesterdayVisitsRetrievedListener.next(res['value']);
    })
  }

  getYesterdayVisitsRetrievedListener() {
    return this.yesterdayVisitsRetrievedListener.asObservable();
  }

  /*Today's Action number */
  getTodayActions(){
    this.http.get<any>('http://localhost/matomo/?module=API&method=VisitsSummary.getActions&idSite=1&period=day&date=today&format=json&token_auth=ceaaf0c1264ab574e8fecd343feabe46')
    .subscribe(res => {
      console.log(res['value']);
      this.todayActionsRetrievedListener.next(res['value']);
    })
  }

  getTodayActionsRetrievedListener() {
    return this.todayActionsRetrievedListener.asObservable();
  }

  /*Today's yesterday number */
  getYesterdayActions(){
    this.http.get<any>('http://localhost/matomo/?module=API&method=VisitsSummary.getActions&idSite=1&period=day&date=yesterday&format=json&token_auth=ceaaf0c1264ab574e8fecd343feabe46')
    .subscribe(res => {
      console.log(res['value']);
      this.yesterdayActionsRetrievedListener.next(res['value']);
    })
  }

  getYesterdayActionsRetrievedListener() {
    return this.yesterdayActionsRetrievedListener.asObservable();
  }

  //Get Action (Behavior)
  getBehaviors(selectedDate){
    this.http.get<any>(
    'http://localhost/matomo/index.php?date='+selectedDate+'&filter_limit=-1&flat=1&format=JSON&idSite=1&method=Actions.getPageUrls&module=API&period=day&segment=&token_auth=ceaaf0c1264ab574e8fecd343feabe46'
    ).subscribe(res => {
      console.log(res);
      this.behavioursRetrievedListener.next(res);
    })

  }

  //'http://localhost/matomo/index.php?module=API&method=Actions.getPageUrls&idSite=1&period=day&date='+selectedDate+'&format=JSON&token_auth=ceaaf0c1264ab574e8fecd343feabe46'

  getBehaviorsRetrivedListener(){
    return this.behavioursRetrievedListener.asObservable();
  }

  getActions(selectedDate){
    this.http.get<any>(
      'http://localhost/matomo/index.php?module=API&method=Actions.get&idSite=1&period=day&date='+selectedDate+'&format=JSON&token_auth=ceaaf0c1264ab574e8fecd343feabe46'
      ).subscribe(res => {
        console.log(res);
        this.actionsRetrievedListener.next(res);
    })
  }

  getActionsRetrivedListener(){
    return this.actionsRetrievedListener.asObservable();
  }



  getActiveUsers(selectedDate){
    this.http.get<any>(
      'http://localhost/matomo/index.php?module=API&method=VisitsSummary.getUsers&idSite=1&period=day&date='+selectedDate+'&format=JSON&token_auth=ceaaf0c1264ab574e8fecd343feabe46'
      ).subscribe(res => {
        console.log('Active Users:', res);
        this.activeUsersRetrievedListener.next(res);
    })
  }

  getActiveUsersRetrivedListener(){
    return this.activeUsersRetrievedListener.asObservable();
  }

  getVisitActions(selectedDate){
    this.http.get<any>(
      'http://localhost/matomo/index.php?module=API&method=VisitsSummary.getActions&idSite=1&period=day&date='+selectedDate+'&format=JSON&token_auth=ceaaf0c1264ab574e8fecd343feabe46'
      ).subscribe(res => {
        console.log('Visitor Actions:', res);
        this.visitActionsRetrievedListener.next(res);
    })
  }

  getVisitActionsRetrivedListener(){
    return this.visitActionsRetrievedListener.asObservable();
  }

  getAllUserMetricByDate(selectedDate){
    this.http.get<any>(
      'http://localhost/matomo/index.php?date='+selectedDate+'&expanded=1&filter_limit=-1&format=JSON&format_metrics=1&idSite=1&method=API.get&module=API&period=day&token_auth=ceaaf0c1264ab574e8fecd343feabe46'
      ).subscribe(res => {
        console.log('Visitor Actions:', res);

        this.allUserMetricByDateListener.next(res);
    })
  }

  getAllUserMetricByDateListener(){
    return this.allUserMetricByDateListener.asObservable();
  }












}









