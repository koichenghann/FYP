import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-visitor',
  templateUrl: './visitor.component.html',
  styleUrls: ['./visitor.component.scss']
})
export class VisitorComponent implements OnInit {

  visitorsData = [50, 80, 40, 70];
  visitorsPercentage = (this.visitorsData[3]-this.visitorsData[2])/this.visitorsData[2]*100;

  customersData = [7, 8, 5, 10];
  customersPercentage = (this.customersData[3]-this.customersData[2])/this.customersData[2]*100;

  conversionRateData = [80, 40, 70, 50];
  conversionRatePercentage = (this.conversionRateData[3]-this.conversionRateData[2])/this.conversionRateData[2]*100;

  bounceRateData = [40, 70, 50, 80];
  bounceRatePercentage = (this.bounceRateData[3]-this.bounceRateData[2])/this.bounceRateData[2]*100;

  constructor() { }

  ngOnInit(): void {
  }

}
