import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-forecast-product-sales-chart',
  templateUrl: './forecast-product-sales-chart.component.html',
  styleUrls: ['./forecast-product-sales-chart.component.scss']
})
export class ForecastProductSalesChartComponent implements OnInit {

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
