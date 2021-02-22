import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { routing } from './app.routing';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule }   from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';


import { DefaultModule } from './test-area/default/default.module';
// import { SideNavService }

import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { SalesChartComponent } from './dashboard/sales-chart/sales-chart.component';
import { ProductSalesDistributionTableComponent } from './dashboard/product-sales-distribution-table/product-sales-distribution-table.component';
import { CustomDataListComponent } from './dashboard/custom-data-list/custom-data-list.component';
import { MonthlySalesReportComponent } from './monthly-sales/monthly-sales-report/monthly-sales-report.component';
import { ProductCategorySalesReportComponent } from './product-category-sales/product-category-sales-report/product-category-sales-report.component';
import { DashboardComponent } from './dashboard/dashboard/dashboard.component';
import { DataEntryManagementComponent } from './data-entry-management/data-entry-management/data-entry-management.component';
import { DataEntryFormComponent } from './data-entry-management/data-entry-form/data-entry-form.component'
import { DataEntryTableListComponent } from './data-entry-management/data-entry-table-list/data-entry-table-list.component';
import { DetailedReportComponent } from './detailed-report/detailed-report/detailed-report.component';
import { ForecastReportComponent } from './forecast-report/forecast-report/forecast-report.component';
import { SideNavComponent } from './shared/side-nav/side-nav.component';
import { SideNavCtsComponent } from './shared/side-nav-cts/side-nav-cts.component'
import { BaseCardTemplateComponent } from './base-card-template/base-card-template.component';
import { HeaderComponent } from './shared/header/header.component';



//angular material
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatStepperModule } from '@angular/material/stepper';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatSelectModule } from '@angular/material/select';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSortModule } from '@angular/material/sort';


import { SideNavService } from './shared/side-nav/side-nav.service';
// import { AreaComponent } from './test-area/widgets/area/area.component';
import { HighchartsChartModule } from 'highcharts-angular';
import { SalesReportComponent } from './charts/sales-report/sales-report.component';
import { ProductSalesDistributionReportComponent } from './charts/product-sales-distribution-report/product-sales-distribution-report.component';
import { CardAreaChartComponent } from './charts/card-area-chart/card-area-chart.component';
import { MonthlySalesReportChartComponent } from './charts/monthly-sales-report-chart/monthly-sales-report-chart.component';
import { ProductSingleCategorySalesReportChartComponent } from './charts/product-single-category-sales-report-chart/product-single-category-sales-report-chart.component';
import { ForecastSalesChartComponent } from './forecast-report/forecast-sales-chart/forecast-sales-chart.component';
import { ForecastProductSalesChartComponent } from './forecast-report/forecast-product-sales-chart/forecast-product-sales-chart.component';
import { BaseGenerationOptionCardComponent } from './base-generation-option-card/base-generation-option-card.component';
import { ProfileComponent } from './auth/profile/profile.component';
import { SubscriptionComponent } from './auth/subscription/subscription.component';
import { ProductsComponent } from './products/products.component';
import { ProductComponent } from './products/product/product.component';
import { MiniCardComponent } from './charts-fyp/mini-card/mini-card.component';

// import { PieComponent } from './test-area/widgets/pie/pie.component';
// import { CardComponent } from './test-area/widgets/card/card.component';
import { AreaSplineComponent } from './webPerformDashboard/widgets/area-spline/area-spline.component';
import { AreaLineUsersComponent } from './webPerformDashboard/widgets/area-line-users/area-line-users.component';
import { AreaLineSessionsComponent } from './webPerformDashboard/widgets/area-line-sessions/area-line-sessions.component';
import { AreaLineComponent } from './webPerformDashboard/widgets/area-line/area-line.component';
import { BarTrafficSourceComponent } from './webPerformDashboard/widgets/bar-traffic-source/bar-traffic-source.component';
import { ColumnUserBehaviorComponent } from './webPerformDashboard/widgets/column-user-behavior/column-user-behavior.component';
import { LineUserMetricComponent } from './webPerformDashboard/widgets/line-user-metric/line-user-metric.component';
import { TableUserMetricComponent }from './webPerformDashboard/widgets/table-user-metric/table-user-metric.component'
import { TableUserBehaviorComponent } from './webPerformDashboard/widgets/table-user-behavior/table-user-behavior.component';
import { TableWebSourceComponent } from './webPerformDashboard/widgets/table-web-source/table-web-source.component';
import { TableAllTrafficComponent } from './webPerformDashboard/widgets/table-all-traffic/table-all-traffic.component';
import { PageWebTrafficComponent } from './webPerformDashboard/page-web-traffic/detailed-web-traffic.component';
import { PageUserMetricComponent } from './webPerformDashboard/page-detailed-user-metric/detailed-user-metric.component';
//import { MapLocationComponent } from './webPerformDashboard/widgets/map-location-my/map-location-my.component';
import { PieTrafficChannelComponent } from './webPerformDashboard/widgets/pie-traffic-channel/pie-traffic-channel.component';
import { SemiPieComponent } from './webPerformDashboard/widgets/semi-pie/semi-pie.component';
import { SideNavbarComponent } from './webPerformDashboard/sideNavBar/side-navbar.component';
import { UserTrackComponent } from './webPerformDashboard/user-track/user-track.component';
import { WebTrafficComponent } from './webPerformDashboard/web-traffic/web-traffic.component';
import { WebPerformDashboardComponent } from './webPerformDashboard/web-perform-dashboard.component';
import { ProductRevenueComponent } from './charts-fyp/product-revenue/product-revenue.component';
import { SellThroughComponent } from './charts-fyp/sell-through/sell-through.component';
import { ProductOrderComponent } from './tables-fyp/product-order/product-order.component';
import { VisitorComponent } from './visitor/visitor.component';
import { SalesComponent } from './sales/sales.component';
import { VisitorsTableComponent } from './visitor/visitors-table/visitors-table.component';
import { CustomerTableComponent } from './visitor/customer-table/customer-table.component';
import { OrderTableComponent } from './sales/order-table/order-table.component';
import { VisitorsCustomersComponent } from './charts-fyp/visitors-customers/visitors-customers.component';
import { SalesOrdersComponent } from './charts-fyp/sales-orders/sales-orders.component';
import { CombinedDataComponent } from './charts-fyp/combined-data/combined-data.component';
import { AbandonmentRateComponent } from './charts-fyp/abandonment-rate/abandonment-rate.component';
import { DashboardFypComponent } from './dashboard-fyp/dashboard-fyp.component';
import { TopProductsTableComponent } from './dashboard-fyp/top-products-table/top-products-table.component';
import { KpiListTableComponent } from './dashboard-fyp/kpi-list-table/kpi-list-table.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    SalesChartComponent,
    ProductSalesDistributionTableComponent,
    CustomDataListComponent,
    MonthlySalesReportComponent,
    ProductCategorySalesReportComponent,
    DashboardComponent,
    DataEntryManagementComponent,
    DataEntryFormComponent,
    DataEntryTableListComponent,
    DetailedReportComponent,
    ForecastReportComponent,
    SideNavComponent,
    BaseCardTemplateComponent,
    HeaderComponent,
    SalesReportComponent,
    ProductSalesDistributionReportComponent,
    SideNavCtsComponent,
    CardAreaChartComponent,
    MonthlySalesReportChartComponent,
    ProductSingleCategorySalesReportChartComponent,
    ForecastSalesChartComponent,
    ForecastProductSalesChartComponent,
    BaseGenerationOptionCardComponent,
    ProfileComponent,
    SubscriptionComponent,
    ProductsComponent,
    ProductComponent,
    MiniCardComponent,
    AreaSplineComponent,
    AreaLineUsersComponent,
    AreaLineSessionsComponent,
    AreaLineComponent,
    BarTrafficSourceComponent,
    ColumnUserBehaviorComponent,
    LineUserMetricComponent,
    //MapLocationComponent,
    PieTrafficChannelComponent,
    PageWebTrafficComponent,
    PageUserMetricComponent,
    TableUserMetricComponent,
    TableUserBehaviorComponent,
    TableWebSourceComponent,
    TableAllTrafficComponent,
    SemiPieComponent,
    SideNavbarComponent,
    UserTrackComponent,
    WebTrafficComponent,
    WebPerformDashboardComponent,
    ProductRevenueComponent,
    SellThroughComponent,
    ProductOrderComponent,
    VisitorComponent,
    SalesComponent,
    VisitorsTableComponent,
    CustomerTableComponent,
    OrderTableComponent,
    VisitorsCustomersComponent,
    SalesOrdersComponent,
    CombinedDataComponent,
    AbandonmentRateComponent,
    DashboardFypComponent,
    TopProductsTableComponent,
    KpiListTableComponent,





    // PieComponent
    // CardComponent
    // AreaComponent
  ],
  imports: [
    DefaultModule,
    routing,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatStepperModule,
    MatButtonToggleModule,
    MatToolbarModule,
    MatIconModule,
    MatMenuModule,
    MatListModule,
    MatDividerModule,
    MatGridListModule,
    MatSelectModule,
    MatPaginatorModule,
    MatTableModule,
    MatCheckboxModule,
    MatExpansionModule,
    MatDividerModule,
    MatSlideToggleModule,
    MatDialogModule,
    MatSortModule,


    HighchartsChartModule
  ],
  providers: [SideNavService],
  bootstrap: [AppComponent]
})
export class AppModule { }
