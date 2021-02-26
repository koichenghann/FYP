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



  getDevices(){
    this.http.get<any>('http://localhost/matomo/?module=API&method=DevicesDetection.getModel&idSite=1&period=month&date=today&format=json&token_auth=ceaaf0c1264ab574e8fecd343feabe46')
    .subscribe(response => {
        console.log(response);
    })

  }

  getTodayVisits(){
    this.http.get<any>('http://localhost/matomo/?module=API&method=VisitsSummary.getVisits&idSite=1&period=day&date=today&format=json&token_auth=ceaaf0c1264ab574e8fecd343feabe46')
    .subscribe(res => {
      console.log(res['value']);
      this.todayVisitsRetrievedListener.next(res['value']);
    })
  }

  getYesterdayVisits(){
    this.http.get<any>('http://localhost/matomo/?module=API&method=VisitsSummary.getVisits&idSite=1&period=day&date=yesterday&format=json&token_auth=ceaaf0c1264ab574e8fecd343feabe46')
    .subscribe(res => {
      console.log(res['value']);
      this.yesterdayVisitsRetrievedListener.next(res['value']);
    })
  }

  getTodayActions(){
    this.http.get<any>('http://localhost/matomo/?module=API&method=VisitsSummary.getActions&idSite=1&period=day&date=today&format=json&token_auth=ceaaf0c1264ab574e8fecd343feabe46')
    .subscribe(res => {
      console.log(res['value']);
      this.todayActionsRetrievedListener.next(res['value']);
    })
  }

  getYesterdayActions(){
    this.http.get<any>('http://localhost/matomo/?module=API&method=VisitsSummary.getActions&idSite=1&period=day&date=yesterday&format=json&token_auth=ceaaf0c1264ab574e8fecd343feabe46')
    .subscribe(res => {
      console.log(res['value']);
      this.yesterdayActionsRetrievedListener.next(res['value']);
    })
  }

  getTodayVisitsRetrievedListener() {
    return this.todayVisitsRetrievedListener.asObservable();
  }

  getYesterdayVisitsRetrievedListener() {
    return this.yesterdayVisitsRetrievedListener.asObservable();
  }

  getTodayActionsRetrievedListener() {
    return this.todayActionsRetrievedListener.asObservable();
  }

  getYesterdayActionsRetrievedListener() {
    return this.yesterdayActionsRetrievedListener.asObservable();
  }

  //Get Action (Behavior)
  getBehaviors(selectedDate){



    this.http.get<any>('http://localhost/matomo/index.php?module=API&method=Actions.getPageUrls&idSite=1&period=day&date='+selectedDate+'&format=JSON&token_auth=ceaaf0c1264ab574e8fecd343feabe46')
    .subscribe(res => {
      console.log(res);
      this.behavioursRetrievedListener.next(res);
    })

  }

  getBehaviorsRetrivedListener(){
    return this.behavioursRetrievedListener.asObservable();
  }







}









