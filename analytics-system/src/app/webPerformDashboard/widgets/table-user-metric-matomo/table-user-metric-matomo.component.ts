import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DatePipe } from '@angular/common';
import {FormControl, FormGroup} from '@angular/forms';
import { MatomoService } from '../../../matomo/matomo.service';
import { Subscription } from 'rxjs';
import { UserActivityService } from '../../service/userActivity.service';
import { UserActivity } from '../../model/userActivity.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AllUserMetricMatomo } from '../../model/userActivityFromMatomo.model';

@Component({
  selector: 'app-user-metric-matomo-table',
  templateUrl: './table-user-metric-matomo.component.html',
  styleUrls: ['./table-user-metric-matomo.component.scss']
})
export class TableUserMetricMatomoComponent implements OnInit {


    filterForm = new FormGroup({
      fromDate: new FormControl(),
      toDate: new FormControl(),
  });

  get fromDate() {
    var d = new Date(this.filterForm.get('fromDate').value),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;

    var formattedDate = [year, month, day].join('-');

    return formattedDate;
  }

  get toDate() {
    var d = new Date(this.filterForm.get('toDate').value),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;

    var formattedDate = [year, month, day].join('-');

    return formattedDate;
  }

  //variables
  allUserActivityMatomoSub: Subscription;
  userActivities: UserActivity[] = [];
  allUserMetricMatomo: AllUserMetricMatomo[] = [];


  constructor(private matomoService :MatomoService, private userActivityService:UserActivityService, private _snackBar: MatSnackBar) {

  }

  applyFilter() {
    this.isLoading = true;
    this.firstLoad = true;

    this.matomoService.getAllUserMetricByMatomo(this.fromDate, this.toDate);
    this.allUserActivityMatomoSub = this.matomoService.getAllUserMetricByMatomoListener()
    .subscribe((res)=>{
      console.log('All User Activity Data from Matomo: ', res);
      console.log(Object.keys(res));
      console.log(res['2021-03-22']);

      if(res!=undefined){

        var userActivityModified = [];

        var keyOfUA = Object.keys(res);

        var dateWithRecord = [];
        var exisitingUserActivity = []

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

        this.dataSource = new MatTableDataSource<AllUserMetricMatomo>(exisitingUserActivity);
        this.sortAndPaginator();





        //console.log('After Modified: ',userActivityModified);
        //console.log('Converted of Key:', keyOfUA);
        //console.log('First item of Data:',keyOfUA[0]);
        //console.log('Remove empty array record:', exisitingUserActivity);
        //console.log('Date with Record: ', dateWithRecord);
        //console.log('Detect Array:',Array.isArray(userActivityModified[2]));



      }


      //this.dataSource = new MatTableDataSource<any>(Object.keys(res));

    });

    /*
    for(let i = 0; i<res.length; i++){
      console.log('number:' + i);
    }
    */

    /**
    this.userActivityService.getAllUserActivities();
    this.allUserActivitySub = this.userActivityService.getUserActivityRetrievedListener()
    .subscribe((res: UserActivity[])=>{
      console.log('All user activity data retrived: ', res);
      //this.dataSource = new MatTableDataSource<UserActivity>(res);
      this.isLoading = false;
      this.userActivities = res;
      this.dataSource = new MatTableDataSource<UserActivity>(this.userActivities);

      this.pipe = new DatePipe('en');
      this.dataSource.filterPredicate = (data, filter) =>{

        console.log('filter log: ',data.date >= this.fromDate && data.date <= this.toDate);
        if (this.fromDate && this.toDate) {

          if((data.date >= this.fromDate && data.date <= this.toDate)){
            this.gotNoDataAfterFilter = true;
            this.firstLoad = true;
          }
          return data.date >= this.fromDate && data.date <= this.toDate;
        }
        return true;
      }

      this.dataSource.filter = ''+Math.random();
      console.log('Filter: ', this.dataSource.filter);

      this.sortAndPaginator();
    },
    error => {
      this.isLoading = true;
    })
    */



  }

  isLoading = true;
  gotNoDataAfterFilter = true;
  firstLoad = false;




  ngOnInit(): void {
    this.gotNoDataAfterFilter = true;


    this.matomoService.getAllUserMetricByMatomo('2021-02-01', this.matomoService.getTodayDate());
    this.allUserActivityMatomoSub = this.matomoService.getAllUserMetricByMatomoListener()
    .subscribe((res)=>{
      console.log('All User Activity Data from Matomo: ', res);
      console.log(Object.keys(res));
      console.log(res['2021-03-22']);

      if(res!=undefined){
        this.isLoading = false;

        var userActivityModified = [];

        var keyOfUA = Object.keys(res);

        var dateWithRecord = [];
        var exisitingUserActivity = []

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

        this.dataSource = new MatTableDataSource<AllUserMetricMatomo>(exisitingUserActivity);
        this.sortAndPaginator();

      }
    });

    /*
    this.userActivityService.getAllUserActivities();
    this.allUserActivitySub = this.userActivityService.getUserActivityRetrievedListener()
    .subscribe((res: UserActivity[])=>{
      console.log('All user activity data retrived: ', res);
      this.isLoading = false;
      if(res.length>0){
        this.gotNoDataAfterFilter = false;
      }

      //this.dataSource = new MatTableDataSource<UserActivity>(res);
      this.userActivities = res;
      this.dataSource = new MatTableDataSource<UserActivity>(this.userActivities);
      this.sortAndPaginator();


      //this.dataSource.sort = this.sort;
      //this.dataSource.paginator = this.paginator;
    })
    */





  }


  ngOnDestroy() {
    //this.behaviorSub.unsubscribe();
    this.allUserActivityMatomoSub.unsubscribe();
  }









  displayedColumns: string[] = ['date','users', 'visitors', 'actions', 'pageViews', /*'uniquePageViews',*/'avgTimeOnSite', 'newSignup'];
  dataSource = new MatTableDataSource<AllUserMetricMatomo>();
  pipe: DatePipe;




  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  sortAndPaginator() {
    setTimeout(() => this.dataSource.paginator = this.paginator);
    setTimeout(() => this.dataSource.sort = this.sort);
  }

  /*
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }*/








}

/*
export interface userActivity{
  activityDate: string,
  users: string,
  pageView: string,
  uniquePageView: string,
  activeUsers: string,
  visitors: string,
  newSignUp: string,
}
*/


/*

export interface Source {
  date:  string,
  visitors: string,
  sessions: string,
  pageView: string,
  icon: string
  signup: string
}

const sources: Source[] = [
  {date: '2020-11-12', visitors: '2032',  sessions: '878', pageView:  '3455' , icon: 'fas fa-caret-up',signup:'347'},
  {date:  '2020-11-13', visitors: '3452',  sessions: '956', pageView:  '5423', icon: 'fas fa-caret-up',signup:'556'},
  {date:  '2020-11-14', visitors: '3213',  sessions: '1023', pageView:  '4322', icon: 'fas fa-caret-down',signup:'558'},
  {date:  '2020-11-15', visitors: '3513',  sessions: '1232', pageView:  '4312', icon: 'fas fa-caret-down',signup:'621'},
  {date:  '2020-11-16', visitors: '3521',  sessions: '1243', pageView:  '4321', icon: 'fas fa-caret-up',signup:'634'},
  {date:  '2020-11-17', visitors: '2752',  sessions: '923', pageView:  '3785', icon: 'fas fa-caret-down',signup:'445'},
  {date:  '2020-11-18', visitors: '1234',  sessions: '693', pageView:  '2313', icon: 'fas fa-caret-up',signup:'231'}


];

*/

