import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatomoService } from '../../../matomo/matomo.service';
import { FormControl, FormBuilder} from '@angular/forms';

@Component({
  selector: 'app-alltraffic-table',
  templateUrl: './table-all-traffic.component.html',
  styleUrls: ['./table-all-traffic.component.scss']
})
export class TableAllTrafficComponent implements OnInit {

  constructor(private matomoService:MatomoService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
  }

  date = new FormControl(new Date());

  dateForm = this.formBuilder.group({
    date: ''
  });

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

  setSelectedDate() {

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
  {referrer: 'localhost:4200', sessions: '387',  percentOfTraffic: '99.8%', trend:  '100%' , icon: 'fas fa-caret-up',ip:'127.0.0.1:4200'},
  {referrer:  'localhost:49620', sessions: '5',  percentOfTraffic: '0.2%', trend:  '0.0%', icon: 'fas fa-caret-down',ip:'127.0.0.1:49620'},
  /*{referrer:  'help.edu.my', sessions: '258',  percentOfTraffic: '12.8%', trend:  '0.0%', icon: 'fas fa-caret-down',ip:'-'},
  {referrer:  'hlms.help.edu.my', sessions: '129',  percentOfTraffic: '9.6%', trend:  '0.0%', icon: 'fas fa-caret-down',ip:'-'},
  {referrer:  'www.facebook.com', sessions: '103',  percentOfTraffic: '9.2%', trend:  '0.0%', icon: 'fas fa-caret-up',ip:'-'},*/
  /*{referrer:  'help.edu.my', sessions: '98',  percentOfTraffic: '8.4%', trend:  '0.7%', icon: 'fas fa-caret-down',ip:'59.16.52.136'},
  {referrer:  'university.help.edu.my', sessions: '34',  percentOfTraffic: '4.3%', trend:  '0.6%', icon: 'fas fa-caret-up',ip:'11.154.136.99'},
  {referrer:  'hlms.help.edu.my', sessions: '34',  percentOfTraffic: '4.3%', trend:  '0.6%', icon: 'fas fa-caret-up',ip:'200.7.95.241'},
  {referrer:  'thestar.com.my', sessions: '34',  percentOfTraffic: '4.3%', trend:  '0.6%', icon: 'fas fa-caret-up',ip:'95.83.241.57'},
  {referrer:  'mail.google.com', sessions: '34',  percentOfTraffic: '4.3%', trend:  '0.6%', icon: 'fas fa-caret-up',ip:'89.241.93.51'}
  */
];
