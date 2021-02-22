import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-order-table',
  templateUrl: './order-table.component.html',
  styleUrls: ['./order-table.component.scss']
})
export class OrderTableComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }


  displayedColumns: string[] = ['orderId', 'customerName', 'date', 'orderAmmount', 'revenue', 'status'];
  dataSource = new MatTableDataSource<Order>(orders);

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



export interface Order {
  orderId: string,
  customerId: string,
  customerName: string,
  orderAmmount: number,
  revenue: number,
  date: string,
  time: string,
  status: string
}

const orders: Order[] = [
  {orderId: 'O001', customerId: 'C001', customerName: 'Jack',   orderAmmount: 1, revenue:  5,   date: '2020/10/14', time: '0930', status: 'pending'},
  {orderId: 'O002', customerId: 'C002', customerName: 'James',  orderAmmount: 2, revenue:  10,  date: '2020/10/15', time: '0930', status: 'delivered'},
  {orderId: 'O003', customerId: 'C003', customerName: 'John',   orderAmmount: 4, revenue:  20,  date: '2020/10/16', time: '0930', status: 'shipping'},
  {orderId: 'O004', customerId: 'C004', customerName: 'Jane',   orderAmmount: 2, revenue:  10,  date: '2020/10/17', time: '0930', status: 'pending'},
  {orderId: 'O005', customerId: 'C005', customerName: 'Janete', orderAmmount: 1, revenue:  5,   date: '2020/10/18', time: '0930', status: 'delivered'},
  {orderId: 'O006', customerId: 'C006', customerName: 'Joshua', orderAmmount: 1, revenue:  5,   date: '2020/10/19', time: '0930', status: 'pending'},
  {orderId: 'O007', customerId: 'C007', customerName: 'Jacky',  orderAmmount: 1, revenue:  5,   date: '2020/10/20', time: '0930', status: 'shipping'},
  {orderId: 'O008', customerId: 'C008', customerName: 'Jeff',   orderAmmount: 1, revenue:  5,   date: '2020/11/08', time: '0930', status: 'pending'},
  {orderId: 'O009', customerId: 'C009', customerName: 'Sam',    orderAmmount: 1, revenue:  5,   date: '2020/11/09', time: '0930', status: 'delivering'},
  {orderId: 'O010', customerId: 'C010', customerName: 'Simson', orderAmmount: 1, revenue:  5,   date: '2020/11/10', time: '0930', status: 'pending'},
  {orderId: 'O011', customerId: 'C011', customerName: 'Sunny',  orderAmmount: 1, revenue:  5,   date: '2020/11/11', time: '0930', status: 'delivery'},
  {orderId: 'O012', customerId: 'C012', customerName: 'Steve',  orderAmmount: 1, revenue:  5,   date: '2020/11/12', time: '0930', status: 'shipping'},
  {orderId: 'O013', customerId: 'C013', customerName: 'Stant',  orderAmmount: 1, revenue:  5,   date: '2020/11/13', time: '0930', status: 'delivered'},
  {orderId: 'O014', customerId: 'C014', customerName: 'Rose',   orderAmmount: 1, revenue:  5,   date: '2020/11/14', time: '0930', status: 'pending'},
  {orderId: 'O015', customerId: 'C015', customerName: 'Amy',    orderAmmount: 1, revenue:  5,   date: '2020/11/15', time: '0930', status: 'dilivered'},
];
