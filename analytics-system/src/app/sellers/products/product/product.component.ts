import {AfterViewInit, Component, ViewChild, OnInit} from '@angular/core';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Router, ActivatedRoute, ParamMap, NavigationStart, NavigationEnd } from '@angular/router';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import { ProductsService } from '../products.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  oriStock = 100;
  //number must be scale down to 0 - 100
  commulativeRevenue = 150;
  revenueData = [50, 80, 40, 70];
  revenuePercentage = (this.revenueData[3]-this.revenueData[2])/this.revenueData[2]*100;

  commulativeItemSold = 30;
  itemSoldData = [7, 8, 5, 10];
  itemSoldPercentage = (this.itemSoldData[3]-this.itemSoldData[2])/this.itemSoldData[2]*100;

  commulativeViews = 300;
  viewData = [80, 40, 70, 50];
  viewPercentage = (this.viewData[3]-this.viewData[2])/this.viewData[2]*100;

  inStock = 70;
  inStockData = [100, 90, 80, 70];
  inStockPercentage = this.oriStock / 100 * this.inStockData[3];



  product;
  // productId;
  constructor(public route: ActivatedRoute, public router: Router, public productsService: ProductsService) {
    // console.log( this.router.getCurrentNavigation());
  }

  ngOnInit(): void {

    this.product = this.productsService.getProductById(this.route.snapshot.params.productId);

    console.log(this.product);

      this.oriStock = this.product.oriStock;
      //number must be scale down to 0 - 100
      this.commulativeRevenue = this.product.revenue;
      this.revenueData = [50, 80, 40, 70];
      this.revenuePercentage = (this.revenueData[3]-this.revenueData[2])/this.revenueData[2]*100;

      this.commulativeItemSold = this.product.sold;
      this.itemSoldData = [7, 8, 5, 10];
      this.itemSoldPercentage = (this.itemSoldData[3]-this.itemSoldData[2])/this.itemSoldData[2]*100;

      this.commulativeViews = 300;
      this.viewData = [80, 40, 70, 50];
      this.viewPercentage = (this.viewData[3]-this.viewData[2])/this.viewData[2]*100;

      this.inStock = this.product.inStock;
      this.inStockData = [100, 90, 80, 70];
      this.inStockPercentage = this.oriStock / 100 * this.inStockData[3];

  }







    displayedColumns: string[] = ['orderId', 'customerName', 'date', 'orderAmmount', 'revenue'];
    dataSource = new MatTableDataSource<G2_orders>(G2_orders);

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








export interface G2_orders {
  orderId: string,
  customerId: string,
  customerName: string,
  orderAmmount: number,
  revenue: number,
  date: string,
  time: string
}

const G2_orders: G2_orders[] = [
  {orderId: 'O001', customerId: 'C001', customerName: 'Jack', orderAmmount: 1, revenue:  5, date: '2020/10/14', time: '0930'},
  {orderId: 'O002', customerId: 'C002', customerName: 'James', orderAmmount: 2, revenue:  10, date: '2020/10/15', time: '0930'},
  {orderId: 'O003', customerId: 'C003', customerName: 'John', orderAmmount: 4, revenue: 20, date: '2020/10/16', time: '0930'},
  {orderId: 'O004', customerId: 'C004', customerName: 'Jane', orderAmmount: 2, revenue:  10, date: '2020/10/17', time: '0930'},
  {orderId: 'O005', customerId: 'C005', customerName: 'Janete', orderAmmount: 1, revenue:  5, date: '2020/10/18', time: '0930'},
  {orderId: 'O006', customerId: 'C006', customerName: 'Joshua', orderAmmount: 1, revenue:  5, date: '2020/10/19', time: '0930'},
  {orderId: 'O007', customerId: 'C007', customerName: 'Jacky', orderAmmount: 1, revenue:  5, date: '2020/10/20', time: '0930'},
  {orderId: 'O008', customerId: 'C008', customerName: 'Jeff', orderAmmount: 1, revenue:  5, date: '2020/11/08', time: '0930'},
  {orderId: 'O009', customerId: 'C009', customerName: 'Sam', orderAmmount: 1, revenue:  5, date: '2020/11/09', time: '0930'},
  {orderId: 'O010', customerId: 'C010', customerName: 'Simson', orderAmmount: 1, revenue:  5, date: '2020/11/10', time: '0930'},
  {orderId: 'O011', customerId: 'C011', customerName: 'Sunny', orderAmmount: 1, revenue:  5, date: '2020/11/11', time: '0930'},
  {orderId: 'O012', customerId: 'C012', customerName: 'Steve', orderAmmount: 1, revenue:  5, date: '2020/11/12', time: '0930'},
  {orderId: 'O013', customerId: 'C013', customerName: 'Stant', orderAmmount: 1, revenue:  5, date: '2020/11/13', time: '0930'},
  {orderId: 'O014', customerId: 'C014', customerName: 'Rose', orderAmmount: 1, revenue:  5, date: '2020/11/14', time: '0930'},
  {orderId: 'O015', customerId: 'C015', customerName: 'Amy', orderAmmount: 1, revenue:  5, date: '2020/11/15', time: '0930'},
];
