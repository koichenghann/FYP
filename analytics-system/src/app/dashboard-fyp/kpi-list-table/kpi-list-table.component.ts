import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-kpi-list-table',
  templateUrl: './kpi-list-table.component.html',
  styleUrls: ['./kpi-list-table.component.scss']
})
export class KpiListTableComponent implements OnInit {
  edit = false;

  setEdit(mode: boolean) {
    this.edit = mode;
  }
  constructor() { }

  ngOnInit(): void {
  }

  displayedColumns: string[] = ['kpi', 'completion', 'progress', 'target'];
  dataSource = new MatTableDataSource<KPI>(kpis);

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



export interface KPI {
  kpi: string,
  completion: number,
  progress: any,
  target: number
}

const kpis: KPI[] = [
  {kpi: 'Commulative Revenue',  completion: 3000, get progress() {return Math.round(100 / this.target * this.completion);}, target: 10000},
  {kpi: 'Commulative Orders',   completion: 1000, get progress() {return Math.round(100 / this.target * this.completion);}, target: 2000},
  {kpi: 'Total Visitors',       completion: 5000, get progress() {return Math.round(100 / this.target * this.completion);}, target: 15000},
  {kpi: 'Total Customer',       completion: 300, get progress() {return Math.round(100 / this.target * this.completion);}, target: 1500},
  {kpi: 'Avg. Order Value',     completion: 30, get progress() {return Math.round(100 / this.target * this.completion);}, target: 100},
  {kpi: 'Conversion Rate',      completion: 50, get progress() {return Math.round(100 / this.target * this.completion);}, target: 60},
  {kpi: 'Bounce Rate',          completion: 80, get progress() {return Math.round(100 / this.target * this.completion);}, target: 50},
  {kpi: 'Abandonment Rate',     completion: 30, get progress() {return Math.round(100 / this.target * this.completion);}, target: 25},
  {kpi: 'Total Item Sold',      completion: 3000, get progress() {return Math.round(100 / this.target * this.completion);}, target: 10000},
];
