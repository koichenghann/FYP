import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-user-metric-table',
  templateUrl: './table-user-metric.component.html',
  styleUrls: ['./table-user-metric.component.scss']
})
export class TableUserMetricComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  displayedColumns: string[] = ['date', 'visitors', 'sessions', 'pageView', 'signup'];
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
