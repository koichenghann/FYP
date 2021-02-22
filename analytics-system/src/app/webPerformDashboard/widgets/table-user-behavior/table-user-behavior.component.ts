import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-user-behavior-table',
  templateUrl: './table-user-behavior.component.html',
  styleUrls: ['./table-user-behavior.component.scss']
})
export class TableUserBehaviorComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {

  }

  displayedColumns: string[] = ['page', 'bounceRate', 'exitRate', 'averageOnTime', 'performance'];
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
