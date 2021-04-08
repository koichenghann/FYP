import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { RecommendationService } from './recommendation.service';

const state = {
  checkoutItems: JSON.parse(localStorage['checkoutItems'] || '[]')
}

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private router: Router, public recoService: RecommendationService) { }

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
    // alert(product[0]._id + '   l: ' + product.length)
    // for(let prod of product) {
    //   alert(prod)
    //   this.recoService.rateProduct(prod._id, 5)
    // }
    for (let i = 0; i < product.length; i++){
      alert(product[i].productName)
      this.recoService.rateProduct(product[i]._id, 5)
    }
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
    this.router.navigate(['/shop/fashion']);
  }

}
