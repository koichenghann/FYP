import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard-fyp',
  templateUrl: './dashboard-fyp.component.html',
  styleUrls: ['./dashboard-fyp.component.scss']
})
export class DashboardFypComponent implements OnInit {

  revenueData = [50, 80, 40, 70];
  revenuePercentage = (this.revenueData[3]-this.revenueData[2])/this.revenueData[2]*100;

  ordersData = [7, 8, 5, 10];
  ordersPercentage = (this.ordersData[3]-this.ordersData[2])/this.ordersData[2]*100;

  salesGrowthData = [50, 80, 40, 70];
  salesGrowthPercentage = (this.salesGrowthData[3]-this.salesGrowthData[2])/this.salesGrowthData[2]*100;

  avgOrdersValueData = [80, 40, 70, 50];
  avgOrdersValuePercentage = (this.avgOrdersValueData[3]-this.avgOrdersValueData[2])/this.avgOrdersValueData[2]*100;

  constructor() { }

  ngOnInit(): void {
  }

}
