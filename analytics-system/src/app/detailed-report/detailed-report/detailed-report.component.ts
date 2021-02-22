import { Component, OnInit } from '@angular/core';

export interface PeriodicElement {
  catergories: string;
  p1: string;
  p2: string;
  p3: string;
  p4: string;
  p5: string;
  p6: string;
  p7: string;
  p8: string;
  p9: string;
  p10: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {catergories: 'Product', p1: 'Food', p2:'Tools' , p3:'Gadget' , p4:'Electronics' , p5:'Lifestyle' , p6:'Furtniture' , p7:'Toys' , p8:'Cleaning' , p9:'Vehicle' , p10:'Stationary' },
  {catergories: 'Sale Distribution', p1:'60.7%', p2:'11.7%' , p3:'10.7%' , p4:'4.6%' , p5:'4.1%' , p6:'1.6%' , p7:'1.6%' , p8:'1.6%' , p9:'1.6%' , p10:'1.6%'},

];
@Component({
  selector: 'app-detailed-report',
  templateUrl: './detailed-report.component.html',
  styleUrls: ['./detailed-report.component.scss']
})
export class DetailedReportComponent implements OnInit {
  displayedColumnsInfo: string[] = ['product', 'salesDistribution'];
  dataSourceInfo = ELEMENT_DATA;

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
