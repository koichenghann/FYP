import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class MatomoService {
  constructor(private http: HttpClient, private router:Router) { }

  /**User */
  private todayVisitsRetrievedListener = new Subject<any>();
  private yesterdayVisitsRetrievedListener = new Subject<any>();
  private todayActionsRetrievedListener = new Subject<any>();
  private yesterdayActionsRetrievedListener = new Subject<any>();

  private behavioursRetrievedListener = new Subject<any>();
  private actionsRetrievedListener = new Subject<any>();
  private activeUsersRetrievedListener = new Subject<any>();
  private visitActionsRetrievedListener = new Subject<any>();

  private allUserMetricByDateListener = new Subject<any>();
  private allUserMetricByMatomoListener = new Subject<any>();

  /**Traffic */
  private trafficSourceListener = new Subject<any>();

  /*Platform */
  private platformBrowserListener = new Subject<any>();
  private platformOSListener = new Subject<any>();

  /*Product*/
  private metricsByProductNameListener = new Subject<any>();
  private metricsByProductIDListener = new Subject<any>();

  /*ecommerce summary*/
  private todayEcommerceSummaryListener = new Subject<any>();
  private ecommerceSummaryListenerByDate = new Subject<any>();
  private ecommerceSummaryListenerByDateRange = new Subject<any>();

  /* */
  //'e7e134eae39f79244e27fc2eea5e76bb' Jacky token
  //'968b159e2ba2255ecf8b403c253068da' my token
  /*Matomo token */
  token = '968b159e2ba2255ecf8b403c253068da';


  /* Return today's date */
  getTodayDate(){
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

  /* Return yesterday's date */
  getYesterdayDate(){
    var today = new Date();
    var yesterday =  new Date();
    yesterday.setDate(today.getDate() - 1)

    var date =  new Date(),
    month = '' + (yesterday.getMonth() + 1),
    day = '' + yesterday.getDate(),
    year = yesterday.getFullYear();

    if (month.length < 2)
    month = '0' + month;
    if (day.length < 2)
    day = '0' + day;

    var formattedDate = [year, month, day].join('-');
    console.log('Yesterday Date:',formattedDate);
    return formattedDate;

  }

        /**   Ecommerce metric reporting    **/


  /*Get today ecommerce summary*/
  getTodayEcommerceSummary(){
    this.http.get<any>(
      'http://localhost/matomo/index.php?date=today&expanded=1&filter_limit=-1&format=JSON&format_metrics=1&idGoal=ecommerceOrder&idSite=1&method=Goals.get&module=API&period=day&segment=&showAllGoalSpecificMetrics=1&token_auth='+this.token
      ).subscribe(res => {
        //console.log('MetricsByProductName:', res);
        this.todayEcommerceSummaryListener.next(res);
    })
  }

  getTodayEcommerceSummaryListener() {
    return this.todayEcommerceSummaryListener.asObservable();
  }

  /*Get ecommerce summary by date*/
  getEcommerceSummaryByDate(selectedDate){
    this.http.get<any>(
      'http://localhost/matomo/index.php?date='+selectedDate+'&expanded=1&filter_limit=-1&format=JSON&format_metrics=1&idGoal=ecommerceOrder&idSite=1&method=Goals.get&module=API&period=day&segment=&showAllGoalSpecificMetrics=1&token_auth='
      +this.token
      ).subscribe(res => {
        //console.log('MetricsByProductName:', res);
        this.ecommerceSummaryListenerByDate.next(res);
    })
  }

  getEcommerceSummaryByListener() {
    return this.ecommerceSummaryListenerByDate.asObservable();
  }


  /*Get ecommerce summary by date range */
  getEcommerceSummaryByDateRange(fromDate,toDate){
    this.http.get<any>(
      'http://localhost/matomo/index.php?date='+fromDate+','+toDate+'&expanded=1&filter_limit=-1&format=JSON&format_metrics=1&idGoal=ecommerceOrder&idSite=1&method=Goals.get&module=API&period=day&segment=&showAllGoalSpecificMetrics=1&token_auth='
      +this.token
      ).subscribe(res => {
        //console.log('MetricsByProductName:', res);
        this.ecommerceSummaryListenerByDateRange.next(res);
    })
  }

  getEcommerceSummaryByListenerDateRange() {
    return this.ecommerceSummaryListenerByDateRange.asObservable();
  }


  /*Get metrics from 'fromData' to 'toDate' by product name*/
  //http://localhost/matomo/index.php?abandonedCarts=1&date=2021-04-04,2021-04-08&expanded=1&filter_limit=-1&format=JSON&idSite=1&method=Goals.getItemsName&module=API&period=day&token_auth=4ab71bdf918bde168663a412df869c52
  getMetricsByProductName(fromDate,toDate){
    this.http.get<any>(
      'http://localhost/matomo/index.php?abandonedCarts=1&date='+fromDate+','+toDate+'&expanded=1&filter_limit=-1&format=JSON&idSite=1&method=Goals.getItemsName&module=API&period=day&token_auth='+this.token
      ).subscribe(res => {
        //console.log('MetricsByProductName:', res);
        this.metricsByProductNameListener.next(res);
    })
  }

  getMetricsByProductNameListener() {
    return this.metricsByProductNameListener.asObservable();
  }

  /*Get metrics from 'fromData' to 'toDate' by product SKU (productID)*/
  getMetricsByProductID(fromDate,toDate){
    this.http.get<any>(
      'http://localhost/matomo/index.php?abandonedCarts=1&date='+fromDate+','+toDate+'&expanded=1&filter_limit=-1&format=JSON&idSite=1&method=Goals.getItemsSku&module=API&period=day&token_auth='+this.token
      /*http://localhost/matomo/index.php?abandonedCarts=1&date=2021-04-04,2021-04-08&expanded=1&filter_limit=-1&format=JSON&idSite=1&method=Goals.getItemsSku&module=API&period=day&token_auth=4ab71bdf918bde168663a412df869c52*/
      ).subscribe(res => {
        //console.log('MetricsByProductID:', res);
        this.metricsByProductIDListener.next(res);
    })
  }

  getMetricsByProductIDListener() {
    return this.metricsByProductIDListener.asObservable();
  }










/**Web performance metric reporting */

  /*Device Platform Metric */
  getDevices(){
    this.http.get<any>('http://localhost/matomo/?module=API&method=DevicesDetection.getModel&idSite=1&period=month&date=today&format=json&token_auth='+this.token)
    .subscribe(response => {
        console.log(response);
    })
  }

  /*Get all main metric from today to yesterday */
  getAllMainMetric(fromDate,toDate){
    this.http.get<any>(
      'http://localhost/matomo/index.php?date='+fromDate+','+toDate+'&expanded=1&filter_limit=-1&format=JSON&format_metrics=1&idSite=1&method=API.get&module=API&period=day&token_auth='+this.token
      ).subscribe(res => {
        console.log('Visitor Actions:', res);

        this.allUserMetricByDateListener.next(res);
    })
  }

  /*Today's visitor number */
  getTodayVisits(){
    this.http.get<any>('http://localhost/matomo/?module=API&method=VisitsSummary.getVisits&idSite=1&period=day&date=today&format=json&token_auth='+this.token)
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
    this.http.get<any>('http://localhost/matomo/?module=API&method=VisitsSummary.getVisits&idSite=1&period=day&date=yesterday&format=json&token_auth='+this.token)
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
    this.http.get<any>('http://localhost/matomo/?module=API&method=VisitsSummary.getActions&idSite=1&period=day&date=today&format=json&token_auth='+this.token)
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
    this.http.get<any>('http://localhost/matomo/?module=API&method=VisitsSummary.getActions&idSite=1&period=day&date=yesterday&format=json&token_auth='+this.token)
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
    'http://localhost/matomo/index.php?date='+selectedDate+'&filter_limit=-1&flat=1&format=JSON&idSite=1&method=Actions.getPageUrls&module=API&period=day&segment=&token_auth='+this.token
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
      'http://localhost/matomo/index.php?module=API&method=Actions.get&idSite=1&period=day&date='+selectedDate+'&format=JSON&token_auth='+this.token
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
      'http://localhost/matomo/index.php?module=API&method=VisitsSummary.getUsers&idSite=1&period=day&date='+selectedDate+'&format=JSON&token_auth='+this.token
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
      'http://localhost/matomo/index.php?module=API&method=VisitsSummary.getActions&idSite=1&period=day&date='+selectedDate+'&format=JSON&token_auth='+this.token
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
      'http://localhost/matomo/index.php?date='+selectedDate+'&expanded=1&filter_limit=-1&format=JSON&format_metrics=1&idSite=1&method=API.get&module=API&period=day&token_auth='+this.token
      ).subscribe(res => {
        console.log('Visitor Actions:', res);

        this.allUserMetricByDateListener.next(res);
    })
  }

  getAllUserMetricByDateListener(){
    return this.allUserMetricByDateListener.asObservable();
  }


  getAllUserMetricByMatomo(fromDate, toDate){
    this.http.get<any>(
      'http://localhost/matomo/index.php?date='+fromDate+','+toDate+'&expanded=1&filter_limit=-1&format=JSON&format_metrics=1&idSite=1&method=API.get&module=API&period=day&token_auth='+this.token
      ).subscribe(res => {
        console.log('Visitor Actions:', res);

        this.allUserMetricByMatomoListener.next(res);
    })
  }

  getAllUserMetricByMatomoListener(){
    return this.allUserMetricByMatomoListener.asObservable();
  }


  /**Traffic Source area */
  getTrafficSourceChannel(selectedDate){
    this.http.get<any>(
      'http://localhost/matomo/index.php?date='+selectedDate+'&expanded=1&filter_limit=-1&format=JSON&idSite=1&method=Referrers.getReferrerType&module=API&period=day&segment=&token_auth='+this.token
      ).subscribe(res => {
        console.log('Traffic Channel got from service:', res);

        this.trafficSourceListener.next(res);
    })
  }

  getTrafficSourceChannelListener(){
    return this.trafficSourceListener.asObservable();
  }

  getPlatformBrowser(todayDate){
    this.http.get<any>(
      'http://localhost/matomo/index.php?date='+todayDate+'&expanded=1&filter_limit=10&format=JSON&idSite=1&method=DevicesDetection.getBrowsers&module=API&period=day&segment=&token_auth='+this.token
      ).subscribe(res => {
        console.log('Platform got from service:', res);

        this.platformBrowserListener.next(res);
    })
  }

  getPlatformBrowserListener(){
    return this.platformBrowserListener.asObservable();
  }

  getPlatformOS(todayDate){
    this.http.get<any>(
      'http://localhost/matomo/index.php?date='+todayDate+'&expanded=1&filter_limit=10&format=JSON&idSite=1&method=DevicesDetection.getOsVersions&module=API&period=day&segment=&token_auth='+this.token
      ).subscribe(res => {
        console.log('Traffic Channel got from service:', res);

        this.platformOSListener.next(res);
    })
  }

  getPlatformOSListener(){
    return this.platformOSListener.asObservable();
  }













}
