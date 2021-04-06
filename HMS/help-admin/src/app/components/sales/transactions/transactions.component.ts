import { Component, OnInit } from '@angular/core';
import { transactionsDB } from 'src/app/shared/tables/transactions';
import { RestapiService } from '../../../restapi.service'
import { DataService } from '../../../data.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss'],
  providers: [DatePipe]
})
export class TransactionsComponent implements OnInit {

  public transactions = []

  constructor(
    private restapi: RestapiService,
    public data: DataService,
    private datePipe: DatePipe
  ) {
    // this.transactions = transactionsDB.data;
  }

  public settings = {
    actions: false,
    hideSubHeader: true,
    columns: {
      orderId: {
        title: 'Order Id', filter: false
      },
      paymentId: {
        title: 'Transaction Id', filter: false
      },
      orderDate: {
        title: 'Date', filter: false,
        valuePrepareFunction: (date) => { 
          var raw = new Date(date);
          var formatted = this.datePipe.transform(raw, 'dd MMM yyyy');
          return formatted;}
      },
      orderStatus: {
        title: 'Delivery Status',
        type: 'html',
        editable: false,
        // valuePrepareFunction: (value) => { 
        //   console.log('value:', value)
        //   if(value == "pending")
        //   return `<i class=\"fa fa-circle font-primary f-12\"></i> Unshipped`
        //   else 
        //   return `<i class=\"fa fa-circle font-success f-12\"></i> Shipped`
          
        // }
      },
      paymentMethod: {
        title: 'Payment Method', filter: false,
        type: 'html',
      },
      amountPaid: {
        title: 'Amount', filter: false,
        valuePrepareFunction: (date) => {  return `RM ${date}` }
          
      },


    },
  };

  getOrders(){
    this.restapi.getS('/admin/orders').subscribe((res: any) => {
      this.transactions = res.orderDetails
      console.log('menus:', res.orderDetails)
   })
  }

  ngOnInit() {
    this.getOrders()
  }

}
