import { Component, OnInit, ViewChild } from '@angular/core';
import { DatatableComponent } from "@swimlane/ngx-datatable";
import { orderDB } from "../../../shared/tables/order-list";
import { RestapiService } from '../../../restapi.service'
import { DataService } from '../../../data.service';
@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {
  public order = [];
  public temp = [];

  @ViewChild(DatatableComponent, { static: false }) table: DatatableComponent;
  constructor(
    private restapi: RestapiService,
    public data: DataService,
  ) { 
    this.restapi.get('seller/order').subscribe((res: any) => {
      res.orderDetails.map(e =>{
        if(e.orderDate) {
          const d = new Date(e.orderDate)
          e.orderDate = d.toDateString();
        } 
        if(e.amountPaid) e.amountPaid = `RM ${e.amountPaid }`
        if(e.orderStatus == "pending") e.orderStatus = `<span class='badge badge-warning'>Processing</span>`
        if(e.orderStatus == "shipped") e.orderStatus = `<span class='badge badge-danger'>Shipped</span>`

      })
      this.order = res.orderDetails
  },
    (err: any) => {
      this.data.error(err['message']);
    }
  )
    
  }

 

  updateFilter(event) {
    const val = event.target.value.toLowerCase();

    // filter our data
    const temp = this.temp.filter(function (d) {
      return d.name.toLowerCase().indexOf(val) !== -1 || !val;
    });

    // update the rows
    this.order = temp;
    // Whenever the filter changes, always go back to the first page
    this.table.offset = 0;
  }



  ngOnInit() {
  }

}
