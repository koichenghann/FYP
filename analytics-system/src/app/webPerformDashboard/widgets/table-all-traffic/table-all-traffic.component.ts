import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-alltraffic-table',
  templateUrl: './table-all-traffic.component.html',
  styleUrls: ['./table-all-traffic.component.scss']
})
export class TableAllTrafficComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  displayedColumns: string[] = ['referrer', 'sessions', 'percentOfTraffic', 'change', 'ipAddress'];
  dataSource = new MatTableDataSource<Source>(sources);

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}




export interface Source {
  referrer:  string,
  sessions: string,
  percentOfTraffic: string,
  trend: string,
  icon: string
  ip: string
}

const sources: Source[] = [
  {referrer: 'facebook.com', sessions: '1015',  percentOfTraffic: '35.8%', trend:  '1.6%' , icon: 'fas fa-caret-up',ip:'199.106.121.249'},
  {referrer:  'google.com', sessions: '439',  percentOfTraffic: '17.6%', trend:  '0.9%', icon: 'fas fa-caret-up',ip:'29.83.168.65'},
  {referrer:  'instagram.com', sessions: '258',  percentOfTraffic: '12.8%', trend:  '0.8%', icon: 'fas fa-caret-down',ip:'169.118.102.230'},
  {referrer:  'twitter.com', sessions: '129',  percentOfTraffic: '9.6%', trend:  '1.5%', icon: 'fas fa-caret-down',ip:'126.118.171.148'},
  {referrer:  'images.google.com', sessions: '103',  percentOfTraffic: '9.2%', trend:  '0.5%', icon: 'fas fa-caret-up',ip:'1.32.237.172'},
  {referrer:  'help.edu.my', sessions: '98',  percentOfTraffic: '8.4%', trend:  '0.7%', icon: 'fas fa-caret-down',ip:'59.16.52.136'},
  {referrer:  'university.help.edu.my', sessions: '34',  percentOfTraffic: '4.3%', trend:  '0.6%', icon: 'fas fa-caret-up',ip:'11.154.136.99'},
  {referrer:  'hlms.help.edu.my', sessions: '34',  percentOfTraffic: '4.3%', trend:  '0.6%', icon: 'fas fa-caret-up',ip:'200.7.95.241'},
  {referrer:  'thestar.com.my', sessions: '34',  percentOfTraffic: '4.3%', trend:  '0.6%', icon: 'fas fa-caret-up',ip:'95.83.241.57'},
  {referrer:  'mail.google.com', sessions: '34',  percentOfTraffic: '4.3%', trend:  '0.6%', icon: 'fas fa-caret-up',ip:'89.241.93.51'}

];
