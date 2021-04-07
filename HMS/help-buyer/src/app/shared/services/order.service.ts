import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Angulartics2 } from 'angulartics2';
import { Angulartics2Piwik } from 'angulartics2/piwik'

const state = {
  checkoutItems: JSON.parse(localStorage['checkoutItems'] || '[]')
}

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private router: Router,
    private angulartics2: Angulartics2 ,
    private angulartics2Piwik:  Angulartics2Piwik,) { }

  // Get Checkout Items
  public get checkoutItems(): Observable<any> {
    const itemsStream = new Observable(observer => {
      observer.next(state.checkoutItems);
      observer.complete();
    });
    return <Observable<any>>itemsStream;
  }

  // Create order
  public createOrder(product: any, details: any, orderId: any, amount: any) {
    var item = {
        shippingDetails: details,
        product: product,
        orderId: orderId,
        totalAmount: amount
    };
    state.checkoutItems = item;
    console.log('checkoutItems:', state.checkoutItems)
    // localStorage.setItem("checkoutItems", JSON.stringify(item));
    localStorage.removeItem("cartItems");
    
    product
    var oid = Math.floor(Math.random() * 100000);
    console.log();
    
    const ecommerceOrder = {
      orderId: 'OID0'+oid.toString(),
      grandTotal: amount,
      subTotal: amount,
      tax: 0,
      shipping: 0,
      discount: false,
    };

    console.log('Order ID: ', 'OID0'+oid.toString());
    console.log('product',product);
    

    this.angulartics2.eventTrack.next({action: 'trackEcommerceOrder', properties: ecommerceOrder});
    this.router.navigate(['/shop/fashion']);
  }
  
}
