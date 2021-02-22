import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-visitors-table',
  templateUrl: './visitors-table.component.html',
  styleUrls: ['./visitors-table.component.scss']
})
export class VisitorsTableComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  displayedColumns: string[] = ['userId', 'name', 'productViewed', 'itemInCart'];
  dataSource = new MatTableDataSource<Visitor>(visitors);

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


export interface Visitor {
  userId: string,
  name: string,
  productViewed: number,
  itemInCart: number
}

const visitors: Visitor[] = [
  {userId: 'u010', name: 'Simson', productViewed: 12,  itemInCart:  5},
  {userId: 'u011', name: 'Sunny',  productViewed: 8,   itemInCart:  0},
  {userId: 'u012', name: 'Steve',  productViewed: 10,  itemInCart:  3},
  {userId: 'u013', name: 'Stant',  productViewed: 15,  itemInCart:  0},
  {userId: 'u014', name: 'Rose',   productViewed: 8,   itemInCart:  1},
  {userId: 'u015', name: 'Amy',    productViewed: 20,  itemInCart:  0},
  {userId: 'u005', name: 'Janete', productViewed: 16,  itemInCart:  0},
  {userId: 'u006', name: 'Joshua', productViewed: 5,   itemInCart:  1},
  {userId: 'u007', name: 'Jacky',  productViewed: 13,  itemInCart:  0},
  {userId: 'u008', name: 'Jeff',   productViewed: 12,  itemInCart:  0},
  {userId: 'u009', name: 'Sam',    productViewed: 5,   itemInCart:  1},
  {userId: 'u001', name: 'Jack',   productViewed: 10,  itemInCart:  0},
  {userId: 'u002', name: 'James',  productViewed: 20,  itemInCart:  2},
  {userId: 'u003', name: 'John',   productViewed: 15,  itemInCart:  4},
  {userId: 'u004', name: 'Jane',   productViewed: 18,  itemInCart:  2},


];
