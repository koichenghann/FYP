import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { MatomoService } from '../../../matomo/matomo.service';
import { FormControl, FormBuilder} from '@angular/forms';
import { TrafficSourceChannel } from '../../model/trafficSourceChannel.model';

@Component({
  selector: 'app-websource-table',
  templateUrl: './table-web-source.component.html',
  styleUrls: ['./table-web-source.component.scss']
})
export class TableWebSourceComponent implements OnInit {

  constructor(private matomoService:MatomoService, private formBuilder: FormBuilder) { }

  getChannelSub: Subscription;

  isLoading = true;

  ngOnInit(): void {
    this.matomoService.getTrafficSourceChannel(this.todayData());
    this.getChannelSub = this.matomoService.getTrafficSourceChannelListener()
    .subscribe(response =>{
      this.isLoading = false;
      console.log('Traffic Channel received:',response);
      this.sortAndPaginator();
    });







  }


  date = new FormControl(new Date());

  dateForm = this.formBuilder.group({
    date: ''
  });

  //displayedColumns: string[] = ['channel', 'sessions', 'percentOfTraffic', 'change'];
  //dataSource = new MatTableDataSource<Traffic>(traffics);

  displayedColumns: string[] = ['channel', 'actions', 'visitors', 'users', 'bounceCount', 'change'];
  dataSource = new MatTableDataSource<TrafficSourceChannel>();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  ngOnDestroy() {
    this.getChannelSub.unsubscribe();
  }

  sortAndPaginator() {
    setTimeout(() => {
      this.dataSource.paginator = this.paginator
    }
    );
    setTimeout(() => this.dataSource.sort = this.sort);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  setSelectedDate(){
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

    this.matomoService.getTrafficSourceChannel(formattedDate);
    this.getChannelSub = this.matomoService.getTrafficSourceChannelListener()
    .subscribe(response =>{
      this.isLoading = false;
      console.log('Traffic Channel received:',response);
      this.dataSource = new MatTableDataSource<TrafficSourceChannel>(response);
      this.sortAndPaginator();

    },
    error => {
      this.isLoading = true;
    });




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

}


/*

export interface Traffic {
  channel: string,
  sessions: string,
  percentOfTraffic: string,
  trend: string,
  icon: string
}

const traffics: Traffic[] = [
  {channel: 'Direct', sessions: '1015',  percentOfTraffic: '35.8%', trend:  '1.6%' , icon: 'fas fa-caret-up'},
  {channel: 'Referral', sessions: '439',  percentOfTraffic: '17.6%', trend:  '0.9%', icon: 'fas fa-caret-up'},
  {channel: 'Email', sessions: '258',  percentOfTraffic: '12.8%', trend:  '0.8%', icon: 'fas fa-caret-down'},
  {channel: 'Paid Search', sessions: '129',  percentOfTraffic: '9.6%', trend:  '1.5%', icon: 'fas fa-caret-down'},
  {channel: 'Search', sessions: '103',  percentOfTraffic: '9.2%', trend:  '0.5%', icon: 'fas fa-caret-up'},
  {channel: 'Social Media', sessions: '98',  percentOfTraffic: '8.4%', trend:  '0.7%', icon: 'fas fa-caret-down'},
  {channel: 'Others', sessions: '34',  percentOfTraffic: '4.3%', trend:  '0.6%', icon: 'fas fa-caret-up'}

];

*/
