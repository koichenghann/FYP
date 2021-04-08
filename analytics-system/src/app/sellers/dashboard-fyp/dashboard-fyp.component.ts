import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { RecommendationServiceService } from 'src/app/services/recommendation-service.service';
import { MatomoService } from './../../matomo/matomo.service';

@Component({
  selector: 'app-dashboard-fyp',
  templateUrl: './dashboard-fyp.component.html',
  styleUrls: ['./dashboard-fyp.component.scss']
})
export class DashboardFypComponent implements OnInit {


  // revenueData = [50, 80, 40, 70];
  // revenuePercentage = (this.revenueData[3]-this.revenueData[2])/this.revenueData[2]*100;
  //
  // ordersData = [7, 8, 5, 10];
  // ordersPercentage = (this.ordersData[3]-this.ordersData[2])/this.ordersData[2]*100;
  //
  // salesGrowthData = [50, 80, 40, 70];
  // salesGrowthPercentage = (this.salesGrowthData[3]-this.salesGrowthData[2])/this.salesGrowthData[2]*100;
  //
  // avgOrdersValueData = [80, 40, 70, 50];
  // avgOrdersValuePercentage = (this.avgOrdersValueData[3]-this.avgOrdersValueData[2])/this.avgOrdersValueData[2]*100;
  // startDate = 0
  username = localStorage.getItem('username')
  last4day = ['', '', '', '']
  revenue = 0
  revenueData = [0, 0, 0, 0];
  revenuePercentage = 0;

  order = 0
  ordersData = [0, 0, 0, 0];
  ordersPercentage = 0;

  productSold = 0
  productSoldData = [0, 0, 0, 0];
  productSoldPercentage = 0;

  conversionRate = ''
  conversionRateData = [0, 0, 0, 0];
  conversionRatePercentage = 0;

  constructor(private matomoService: MatomoService, public http: HttpClient, public recoService: RecommendationServiceService) { }

  /*Subcription */
  todaySummarySub: Subscription;
  summaryByDateRangeSub: Subscription;
  metricsByProductNameSub: Subscription;

  orders_retrieved: Subscription;

  weekago = new Date()
  startDate = ""
  endDate = this.formatDate(new Date())

  orders



  ngOnInit(): void {

    // this.revenueData = [0, 1, 2, 0];

    this.weekago.setDate(this.weekago.getDate() - 6);
    this.startDate = this.formatDate(this.weekago);

    // alert("this ran")
    // this.getOrders()
    // this.endDate.setDate(this.startDate.getDate() - 3)
    //
    // this.matomoService.getTodayEcommerceSummary();
    // this.todaySummarySub= this.matomoService.getTodayEcommerceSummaryListener()
    // .subscribe((res)=>{
    //   console.log('Ecommerce summary:', res);
    //   // alert(JSON.stringify(res.revenue))
    // });
    //
    // /*if you need date filter, I have one in my Detailed User Activity Analysis under table-user-metric-matomo.component.ts */
    //   //this method takes two dates as date range
    // this.matomoService.getMetricsByProductID(this.matomoService.getYesterdayDate(),this.matomoService.getTodayDate());
    // this.metricsByProductNameSub = this.matomoService.getMetricsByProductIDListener()
    // .subscribe((res)=>{
    //   console.log('Metrics by product id from yesterday to today:', res);
    // })
    //
    // this.matomoService.getMetricsByProductName(this.matomoService.getYesterdayDate(),this.matomoService.getTodayDate());
    // this.metricsByProductNameSub = this.matomoService.getMetricsByProductNameListener()
    // .subscribe((res)=>{
    //   console.log('Metrics by product name from yesterday to today:', res);
    // })
    //
    // /*Get ecommerce summanry by date range  */
    // // this.matomoService.getEcommerceSummaryByDateRange(this.matomoService.getYesterdayDate(),this.matomoService.getTodayDate());
    // this.summaryByDateRangeSub = this.matomoService.getEcommerceSummaryByListenerDateRange()
    // .subscribe((res)=>{
    //   console.log('Ecommerce summary by date range:', res);
    //   this.handleOverview(res);
    // })
    // this.matomoService.getEcommerceSummaryByDateRange(this.formatDate(this.endDate), this.formatDate(this.startDate));

    this.orders_retrieved = this.recoService.get_orders_retrieved_listener().subscribe((res) => {
      // this.revenueData = [0, 1, 2, 0];
      // this.revenueData = [0, 0, 10, 0];
      // this.revenuePercentage = 30;
      // alert(res)
      this.orders = res
      var filtered_orders = this.orders['orders'].filter(x => x['orderDate'] >= this.startDate && x['orderDate'] <= this.endDate)
      var filtered_ratings = this.orders['ratings'].filter(x => x['date'] >= this.startDate && x['date'] <= this.endDate)
      var filtered_carts = this.orders['carts'].filter(x => x['date'] >= this.startDate && x['date'] <= this.endDate)
      this.handleOrders(filtered_orders, filtered_ratings, filtered_carts, this.orders['products']);
      // this.handleOrders(res['orders'], res['ratings'], res['carts'], res['products']);
      this.filterByDate()
    })
    this.recoService.getOrders();
  }

  ngOnDestroy() {
    this.todaySummarySub.unsubscribe();
    this.metricsByProductNameSub.unsubscribe();
    this.summaryByDateRangeSub.unsubscribe();
    this.orders_retrieved.unsubscribe();
  }



  handleOrders(orders, ratings, carts, products){
    this.load_mini_card(orders, ratings)
    this.load_spline_chart(orders)
    this.load_pie_chart(carts, products)
    this.recoService.refreshChart({chart: 'product-table', data: orders});
    this.recoService.refreshChart({chart: 'orders-table', data: orders});
  }


  filterByDate(){
    // console.log(this.startDate + '   ' + this.endDate)
    var filtered_orders = this.orders['orders'].filter(x => x['orderDate'] >= this.startDate && x['orderDate'] <= this.endDate)
    var filtered_ratings = this.orders['ratings'].filter(x => x['date'] >= this.startDate && x['date'] <= this.endDate)
    var filtered_carts = this.orders['carts'].filter(x => x['date'] >= this.startDate && x['date'] <= this.endDate)
    this.handleOrders(filtered_orders, filtered_ratings, filtered_carts, this.orders['products']);
  }


  load_spline_chart(orders){
    //split date to array of 7 days and format to yyyy-mm-dd string
    var currentTime = new Date();
    var last7day1 = [new Date(), new Date(), new Date(), new Date(), new Date(), new Date(), new Date()]
    for (let i = 1; i < 4; i++) {
      last7day1[i].setDate(last7day1[i - 1].getDate() - 1);
    }
    last7day1.reverse();
    var last7day = last7day1.map(a => this.formatDate(a))
    // this.last4day = last4day
    // console.log(this.last4day)


    //split and store orders object in 4 days format according to the 7 days string
    var days = last7day
    var ordersIn7day = new Array(days.length)
    for (let day in days) {
      ordersIn7day[day] = []
    }
    for (let order of orders) {
      for (let day of days) {
        if (order['orderDate'].slice(0, 10) == day) {
          const index = days.indexOf(day);
          ordersIn7day[index].push(order);
        }
      }
    }

    var date = days
    var revenue = [0, 0, 0, 0, 0, 0, 0];
    var orders1 = [0, 0, 0, 0, 0, 0, 0];
    var quantity = [0, 0, 0, 0, 0, 0, 0];
    var avgOrderVal = [0, 0, 0, 0, 0, 0, 0];
    var totalOrder = 0
    var totalRevenue = 0

    for (let i in ordersIn7day) {
      totalOrder = 0;
      totalRevenue = 0;
      for (let order of ordersIn7day[i]) {
        revenue[i] += parseFloat(order['amountPaid']);
        orders1[i] += 1;
        quantity[i] += parseFloat(order['quantity']);
        totalRevenue += parseFloat(order['amountPaid']);
        totalOrder += 1;
      }
      // console.log(totalRevenue.toString() + ' '+ totalOrder.toString())
      avgOrderVal[i] = totalRevenue / totalOrder
      if (totalOrder == 0 || totalRevenue == 0) {avgOrderVal[i] = 0}
    }
    var result = {date: date, revenue:revenue, order:orders1, quantity:quantity, avgOrderVal:avgOrderVal}
    // console.log(result);

    this.recoService.refreshChart({chart: 'spline-chart', data: result});
  }


  load_pie_chart(carts, products){
    // console.log(carts)
    // console.log(products)

    var totalCarts = carts.length
    var abandonedCarts = 0
    var abandonedRevenue = 0

    for (let cart of carts) {
      if (cart['status'] == 'abandoned') {
        abandonedCarts += 1;
        abandonedRevenue += products.find(x => x['_id'] == cart['product'])['price']
      }
    }
    var abandonmentRate = (abandonedCarts/totalCarts*100).toFixed(2);
    var result = {totalCarts:totalCarts, abandonmentRate: abandonmentRate, abandonedCarts: abandonedCarts, abandonedRevenue: abandonedRevenue}
    // console.log(result)


    // console.log(abandonedCarts + '  '+ total_carts)
    // console.log('abandonmentRate: ' + abandonmentRate);
    this.recoService.refreshChart({chart: 'pie-chart', data: result});
  }



  load_mini_card(orders, ratings) {
    //cacl total
    var c_total = 0
    var c_order = 0
    for (let rating of ratings) {
      c_total += 1;
      if (rating['rating'] == 5){
        c_order+=1
      }
    }
    this.conversionRate = (c_order/c_total*100).toFixed(2);



    this.revenue = 0;
    this.order = 0;
    this.productSold = 0;
    for (let order of orders) {
      this.revenue += parseFloat(order['amountPaid']);
      this.productSold += parseFloat(order['quantity']);
      this.order += 1;
      //last mini card

    }

    //split date to array of 4 days and format to yyyy-mm-dd string
    var currentTime = new Date();
    var last4day1 = [new Date(), new Date(), new Date(), new Date()]
    for (let i = 1; i < 4; i++) {
      last4day1[i].setDate(last4day1[i - 1].getDate() - 1);
    }
    last4day1.reverse();
    var last4day = last4day1.map(a => this.formatDate(a))
    this.last4day = last4day

    //split and store orders object in 4 days format according to the 4 days string
    var days = last4day
    var ordersIn4day = new Array(days.length)
    for (let day in days) {
      ordersIn4day[day] = []
    }
    for (let order of orders) {
      for (let day of days) {
        if (order['orderDate'].slice(0, 10) == day) {
          const index = days.indexOf(day);
          ordersIn4day[index].push(order);
        }
      }
    }



    this.conversionRateData = [0, 0, 0, 0]
    //split and store ratings object in 4 days format according to 4 days string
    var ratingsIn4day = new Array(days.length)
    for (let i in days) {
      // console.log(days[i])
      var r_total = 0
      var r_order = 0
      for (let rating of ratings) {
        // console.log(rating)
        if (rating['date'] == days[i]){
          r_total += 1
          if ((rating['rating'] == 5)) {
            r_order += 1
          }
        }
      }
      // console.log(days[i] + '  total: ' + r_total + '  order: ' + r_order)
      if (r_total != 0 && r_order != 0){
          this.conversionRateData[i] += r_order/r_total*100;
      } else {
          this.conversionRateData[i] += 0;
      }

    }
    // console.log(this.conversionRateData)
    this.conversionRatePercentage = (this.conversionRateData[3]-this.conversionRateData[2])/this.conversionRateData[2]*100;

    //calculate the total for each day
    this.revenueData = [0, 0, 0, 0];
    this.ordersData = [0, 0, 0, 0];
    this.productSoldData = [0, 0, 0, 0];
    // this.avgOrdersValueData = [0, 0, 0, 0];
    for (let i in ordersIn4day) {
      for (let order of ordersIn4day[i]) {
        this.revenueData[i] += parseFloat(order['amountPaid'])
        this.ordersData[i] += 1
        this.productSoldData[i] += parseFloat(order['quantity'])
      }
    }
    this.revenuePercentage = (this.revenueData[3]-this.revenueData[2])/this.revenueData[2]*100;
    this.ordersPercentage = (this.ordersData[3]-this.ordersData[2])/this.ordersData[2]*100;
    this.productSoldPercentage = (this.productSoldData[3]-this.productSoldData[2])/this.productSoldData[2]*100;


    console.log(this.revenueData)
    this.recoService.refreshChart2([this.revenueData, this.ordersData, this.productSoldData, this.conversionRateData]);




    // this.conversionRateData = [0, 0, 0, 0]
    // // for ()
    // var c_total = 0
    // var c_order = 0
    // for (let rating of ratings) {
    //   c_total += 1;
    //   if (rating['rating'] == 5){
    //     c_order+=1
    //   }
    // }
    // this.conversionRate = (c_order/c_total*100);


  }



  formatDate(date) {
    var dd = String(date.getDate()).padStart(2, '0');
    var mm = String(date.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = date.getFullYear();
    var result = yyyy + '-' + mm + '-' + dd;
    return result
  }






  //date
  //revenue
  //Order
  //Item sold
  //Average Order Revenue



  // getOrders() {
  //   this.http.post('http://127.0.0.1:5000/ordersDetails', {username: 'koichenghann'}).subscribe(
  //     response => {
  //       // alert(JSON.stringify(response));
  //       if (response) {
  //         // alert(JSON.stringify(response))
  //
  //         // this.user_retrieved_listener.next(response);
  //         // localStorage.setItem('currentUser', JSON.stringify(response));
  //         // this.router.navigate(['recommendations']);
  //       }
  //       else {
  //         alert('no orders retrieved');
  //       }
  //     }
  //   );
  // }



}









// handleOverview(data) {
//   let i = 0
//   for (let day in data) {
//     if (data[day].length != 0){
//       this.revenueData[i] = parseFloat(data[day].revenue)
//       this.ordersData[i] = parseFloat(data[day].items)
//       //sale growth data here is Visitors converted
//       this.salesGrowthData[i] = parseFloat(data[day].nb_visits_converted)
//       //avg order is actually the conversion rate here
//       this.avgOrdersValueData[i] = parseFloat(data[day].conversion_rate)
//     }
//   }
//   this.revenueData.reverse();
//   this.ordersData.reverse();
//   this.salesGrowthData.reverse()
//   this.avgOrdersValueData.reverse();
//   // alert(this.revenueData)
//   this.revenuePercentage = (this.revenueData[3]-this.revenueData[2])/this.revenueData[2]*100;
//   this.ordersPercentage = (this.ordersData[3]-this.ordersData[2])/this.ordersData[2]*100;
//   this.salesGrowthPercentage = (this.salesGrowthData[3]-this.salesGrowthData[2])/this.salesGrowthData[2]*100;
//   this.avgOrdersValuePercentage = (this.avgOrdersValueData[3]-this.avgOrdersValueData[2]);
//   // alert(JSON.stringify(data))
// }


















//a
