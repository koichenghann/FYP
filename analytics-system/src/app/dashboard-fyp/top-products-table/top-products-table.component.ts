import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ProductsService } from '../../products/products.service';


@Component({
  selector: 'app-top-products-table',
  templateUrl: './top-products-table.component.html',
  styleUrls: ['./top-products-table.component.scss']
})
export class TopProductsTableComponent implements OnInit {

  constructor(public productsService: ProductsService) { }

  ngOnInit(): void {
  }

  displayedColumns: string[] = ['productId', 'name', 'price', 'sold', 'revenue'];
  dataSource = new MatTableDataSource<Product>(this.productsService.getProducts());

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


export interface Product {
  productId: string,
  name: string,
  price: number,
  oriStock: number,
  sold: number,
  inStock: number,
  revenue: number
}

const Product: Product[] = [
  {productId: 'P001', name: 'Pilot G2',             price: 5, oriStock: 100, sold: 30, inStock: 70, revenue: 150},
  {productId: 'P002', name: 'Stabilo 2B Pencil',    price: 12, oriStock: 100, sold: 30, inStock: 70, revenue: 360},
  {productId: 'P003', name: 'Vacuum Flask',         price: 30, oriStock: 100, sold: 30, inStock: 70, revenue: 900},
  {productId: 'P004', name: 'Plastic Ruler',        price: 1, oriStock: 100, sold: 30, inStock: 70, revenue: 30},
  {productId: 'P005', name: 'Plain T-Shirt',        price: 10, oriStock: 100, sold: 30, inStock: 70, revenue: 300},
  {productId: 'P006', name: 'Graphic T-Shirt',      price: 20, oriStock: 100, sold: 30, inStock: 70, revenue: 600},
  {productId: 'P007', name: 'Table Clock',          price: 15, oriStock: 100, sold: 30, inStock: 70, revenue: 450},
  {productId: 'P008', name: 'Alarm Clock',          price: 30, oriStock: 100, sold: 30, inStock: 70, revenue: 900},
  {productId: 'P008', name: 'Analog Watch',         price: 50, oriStock: 100, sold: 30, inStock: 70, revenue: 1500},
  {productId: 'P010', name: 'Digital Watch',        price: 50, oriStock: 100, sold: 30, inStock: 70, revenue: 1500},
  {productId: 'P011', name: 'Summer Flip Flop',     price: 20, oriStock: 100, sold: 30, inStock: 70, revenue: 600},
  {productId: 'P012', name: '3D Pen',               price: 100, oriStock: 100, sold: 30, inStock: 70, revenue: 3000},
  {productId: 'P013', name: '32GB SD memory card',  price: 20, oriStock: 100, sold: 30, inStock: 70, revenue: 600},
  {productId: 'P014', name: '500GB SSD 2.5"',       price: 250, oriStock: 100, sold: 30, inStock: 70, revenue: 7500},
  {productId: 'P015', name: '256GB M.2 SSD',        price: 300, oriStock: 100, sold: 30, inStock: 70, revenue: 9000},
  {productId: 'P016', name: 'A4 Paper 100gsm',      price: 20, oriStock: 100, sold: 30, inStock: 70, revenue: 600},
  {productId: 'P017', name: 'Steel Bottle 800ml',   price: 30, oriStock: 100, sold: 30, inStock: 70, revenue: 900},
  {productId: 'P018', name: 'BPA free Bottle 1L',   price: 30, oriStock: 100, sold: 30, inStock: 70, revenue: 900},
  {productId: 'P019', name: 'Present Wrap',         price: 5, oriStock: 100, sold: 30, inStock: 70, revenue: 150},
  {productId: 'P020', name: 'Hot Glue',             price: 5, oriStock: 100, sold: 30, inStock: 70, revenue: 150}
];
