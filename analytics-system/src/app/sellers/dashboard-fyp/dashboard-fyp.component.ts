import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { MatomoService } from './../../matomo/matomo.service';

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

  constructor(private matomoService: MatomoService) { }

  /*Subcription */
  todaySummarySub: Subscription;
  summaryByDateRangeSub: Subscription;
  metricsByProductNameSub: Subscription;



  ngOnInit(): void {


    this.matomoService.getTodayEcommerceSummary();
    this.todaySummarySub= this.matomoService.getTodayEcommerceSummaryListener()
    .subscribe((res)=>{
      console.log('Ecommerce summary:', res);
    });

    /*if you need date filter, I have one in my Detailed User Activity Analysis under table-user-metric-matomo.component.ts */
      //this method takes two dates as date range
    this.matomoService.getMetricsByProductID(this.matomoService.getYesterdayDate(),this.matomoService.getTodayDate());
    this.metricsByProductNameSub = this.matomoService.getMetricsByProductIDListener()
    .subscribe((res)=>{
      console.log('Metrics by product id from yesterday to today:', res);
    })

    this.matomoService.getMetricsByProductName(this.matomoService.getYesterdayDate(),this.matomoService.getTodayDate());
    this.metricsByProductNameSub = this.matomoService.getMetricsByProductNameListener()
    .subscribe((res)=>{
      console.log('Metrics by product name from yesterday to today:', res);
    })

    /*Get ecommerce summanry by date range  */
    this.matomoService.getEcommerceSummaryByDateRange(this.matomoService.getYesterdayDate(),this.matomoService.getTodayDate());
    this.summaryByDateRangeSub = this.matomoService.getEcommerceSummaryByListenerDateRange()
    .subscribe((res)=>{
      console.log('Ecommerce summary by date range:', res);
    })

  }

  ngOnDestroy() {
    this.todaySummarySub.unsubscribe();
    this.metricsByProductNameSub.unsubscribe();
    this.summaryByDateRangeSub.unsubscribe();
  }

}
