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

@Component({
  selector: 'app-user-metric-table',
  templateUrl: './table-user-metric.component.html',
  styleUrls: ['./table-user-metric.component.scss']
})
export class TableUserMetricComponent implements OnInit {

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
  allUserActivitySub: Subscription;
  userActivities: UserActivity[] = [];


  constructor(private matomoService :MatomoService, private userActivityService:UserActivityService) {

  }

  applyFilter() {
    this.userActivityService.getAllUserActivities();
    this.allUserActivitySub = this.userActivityService.getUserActivityRetrievedListener()
    .subscribe((res: UserActivity[])=>{
      console.log('All user activity data retrived: ', res);
      //this.dataSource = new MatTableDataSource<UserActivity>(res);
      this.userActivities = res;
      this.dataSource = new MatTableDataSource<UserActivity>(this.userActivities);

      this.pipe = new DatePipe('en');
      this.dataSource.filterPredicate = (data, filter) =>{
        if (this.fromDate && this.toDate) {
          return data.date >= this.fromDate && data.date <= this.toDate;
        }
        return true;
      }
      this.dataSource.filter = ''+Math.random();
    })

  }



  ngOnInit(): void {
    this.userActivityService.getAllUserActivities();
    this.allUserActivitySub = this.userActivityService.getUserActivityRetrievedListener()
    .subscribe((res: UserActivity[])=>{
      console.log('All user activity data retrived: ', res);
      //this.dataSource = new MatTableDataSource<UserActivity>(res);
      this.userActivities = res;
      this.dataSource = new MatTableDataSource<UserActivity>(this.userActivities);

      //this.dataSource.sort = this.sort;
      //this.dataSource.paginator = this.paginator;
    })





  }


  ngOnDestroy() {
    //this.behaviorSub.unsubscribe();
    this.allUserActivitySub.unsubscribe();
    this.allUserActivitySub.unsubscribe();
  }









  displayedColumns: string[] = ['date','users', 'visitors', 'actions', 'pageViews', 'uniquePageViews', 'newSignup'];
  dataSource = new MatTableDataSource<UserActivity>();
  pipe: DatePipe;




  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
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

