import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-customer-table',
  templateUrl: './customer-table.component.html',
  styleUrls: ['./customer-table.component.scss']
})
export class CustomerTableComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  displayedColumns: string[] = ['userId', 'name', 'orders', 'spending'];
  dataSource = new MatTableDataSource<Customer>(customers);

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




export interface Customer {
  userId: string,
  name: string,
  spending: number,
  orders: number
}

const customers: Customer[] = [
  {userId: 'u001', name: 'Jack',   spending: 10,  orders:  1},
  {userId: 'u002', name: 'James',  spending: 20,  orders:  2},
  {userId: 'u003', name: 'John',   spending: 40,  orders:  4},
  {userId: 'u004', name: 'Jane',   spending: 20,  orders:  2},
  {userId: 'u005', name: 'Janete', spending: 30,  orders:  2},
  {userId: 'u006', name: 'Joshua', spending: 5,   orders:  1},
  {userId: 'u007', name: 'Jacky',  spending: 13,  orders:  1},
  {userId: 'u008', name: 'Jeff',   spending: 12,  orders:  1},
  {userId: 'u009', name: 'Sam',    spending: 5,   orders:  1},
  {userId: 'u010', name: 'Simson', spending: 120, orders:  5},
  {userId: 'u011', name: 'Sunny',  spending: 30,  orders:  2},
  {userId: 'u012', name: 'Steve',  spending: 70,  orders:  3},
  {userId: 'u013', name: 'Stant',  spending: 15,  orders:  2},
  {userId: 'u014', name: 'Rose',   spending: 8,   orders:  1},
  {userId: 'u015', name: 'Amy',    spending: 20,  orders:  2},
];
