import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-category-sales-report',
  templateUrl: './product-category-sales-report.component.html',
  styleUrls: ['./product-category-sales-report.component.scss']
})
export class ProductCategorySalesReportComponent implements OnInit {
  datasource = [];
  months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ];
  years = [
    '2019',
    '2020'
  ]
  categories = [
    'Furniture',
    'Tools',
    'Gadget',
    'Electronics',
    'Lifestyle',
    'Food',
    'Toys',
    'Cleaning',
    'Vehicle',
    'Stationary'
  ]
  product1 = [
    {no: "1.", name: "chair 1", sold:"600", revenue:"6000.00MYR"},
    {no: "2.", name: "Table 1", sold:"150 ↓", revenue:"1500.00MYR ↓"},
    {no: "3.", name: "Table 2", sold:"150 ↑", revenue:"1500.00MYR ↑"},
    {no: "4.", name: "Sofa 1", sold:"50 ↑", revenue:"500.00MYR ↑"},
    {no: "5.", name: "Shelf 1", sold:"50", revenue:"500.00MYR"}
  ];
  product2 = [
    {no: "1.", name: "Desk 1", sold:"15 ↑", revenue:"150.00MYR ↑"},
    {no: "2.", name: "Shelf 2", sold:"15", revenue:"150.00MYR"},
    {no: "3.", name: "Shelf 3", sold:"15", revenue:"150.00MYR"},
    {no: "4.", name: "Carpet 1", sold:"15 ↓", revenue:"1500.00MYR ↓"},
    {no: "5.", name: "Shelf 4", sold:"15 ↓", revenue:"150.00MYR ↓"}
  ];
  constructor() { }

  ngOnInit(): void {
  }

}
