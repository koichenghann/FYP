import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { RecommendationServiceService } from 'src/app/services/recommendation-service.service';
import { ProductsService } from '../../products/products.service';


@Component({
  selector: 'app-top-products-table',
  templateUrl: './top-products-table.component.html',
  styleUrls: ['./top-products-table.component.scss']
})
export class TopProductsTableComponent implements OnInit {


    refresh: Subscription;
    displayedColumns: string[] = ['productName', 'lastSold', 'quantity', 'percentage', 'revenue'];//'status'
    dataSource;
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    orders_retrieved: Subscription;

    constructor(  public recoService: RecommendationServiceService) { }
    ngOnInit(): void {
      // this.orders_retrieved = this.recoService.get_orders_retrieved_listener().subscribe((res) => {
      //   this.getProductsPerformance(res['orders']);
      //
      //
      // })
      // this.recoService.getOrders();



      this.refresh = this.recoService.get_refreh_listener().subscribe((res)=>{
        if (res.chart == 'product-table') {
          // alert('helo')
          this.getProductsPerformance(res.data)
        }
      })
    }
    ngOnDestroy(){
      this.orders_retrieved.unsubscribe();
    }

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


    getProductsPerformance(orders) {
      var products = []
      var totalRevenue = 0.0
      for (let order of orders) {
        totalRevenue += parseFloat(order['amountPaid'])
        if (products.find(x => x.productName == order['productName'])) {
          let newDate
          const index = products.indexOf(products.find(x => x.productName == order['productName']))
          products[index].quantity += order['quantity'];
          products[index].revenue = parseFloat(products[index].revenue) + parseFloat(order['amountPaid']);
          if (products[index].lastSold.slice(0, 10) < order['orderDate'].slice(0, 10)) {
            products[index].lastSold = order['orderDate']
          }

        } else {
          products.push({productName: order['productName'], quantity: order['quantity'], revenue: order['amountPaid'], lastSold: order['orderDate'], percentage: 0.0})
        }
      }
      // console.log(products)


      for (let prod of products){
        prod.percentage = (prod.revenue/totalRevenue)*100
      }


      // var newList = []
      // for (let a of orders){
      //   newList.push({productName: a['productName'], quantity: a['quantity'], revenue: a['amountPaid'], lastSold: a['orderDate']})
      // }
      // console.log(orders)
      // console.log(newList)
      this.dataSource = new MatTableDataSource(products)
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;

    }
    // amountPaid: "30"
    // buyerUserName: "testbuyer001"
    // orderDate: "2021-04-07 12:25:17.813000"
    // productName: "Sample - HELP T-shirt (White)"
    // quantity: 1
    // _id:: "606da68560710a1c0c34c51d"
}

































//
