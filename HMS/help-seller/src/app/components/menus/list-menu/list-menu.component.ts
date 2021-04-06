import { Component, OnInit } from '@angular/core';
import { menuDB } from 'src/app/shared/tables/menu';
import { RestapiService } from '../../../restapi.service'
import { DataService } from '../../../data.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-list-menu',
  templateUrl: './list-menu.component.html',
  styleUrls: ['./list-menu.component.scss'],
  providers: [DatePipe]

})
export class ListMenuComponent implements OnInit {

  public menus = [];
  public selected = [];

  constructor(
    private restapi: RestapiService,
    public data: DataService,
    private datePipe: DatePipe
  ) {
    // this.menus = menuDB.data;
  }

  onSelect({ selected }) {
    this.selected.splice(0, this.selected.length);
    this.selected.push(...selected);
  }
  

  public settings = {
    actions: {
      add: false,
      edit: false,
      delete: false
    },
    selectMode: 'multi',
    columns: {
     
      orderId: {
        title: 'Order ID',
      },
      productName: {
        title: 'Product Name',
      },
      courier: {
        title: 'Courier',
      },
      orderStatus: {
        title: 'Status',
        type: 'html',
        editable: false,
        valuePrepareFunction: (value) => { 
          if(value == "pending")
          return `<i class=\"fa fa-circle font-primary f-12\"></i> Unshipped`
          else 
          return `<i class=\"fa fa-circle font-success f-12\"></i> Shipped`
          
        }
      },
      orderDate: {
        title: 'Created Date',
        valuePrepareFunction: (date) => { 
          var raw = new Date(date);
          var formatted = this.datePipe.transform(raw, 'dd MMM yyyy');
          return formatted;}
      },
    },
  };
  public onUserRowSelect(event) {
    this.selected = event.selected;
  }
  public onProcess() {
    this.selected.forEach(e => {
      this.restapi.patch(`seller/order`,{ orderId: e.orderId}).subscribe((res: any) => {
        this.getOrders()
        this.data.success(res.message);
      },
        (err: any) => {
          this.data.error(err['message']);
        }
      )
    });
  }

  getOrders(){
    this.restapi.get('seller/order').subscribe((res: any) => {
      this.menus = res.orderDetails
   })
  }

  ngOnInit() {
    this.getOrders()
  }

}
