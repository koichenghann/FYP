import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductService } from "../../shared/services/product.service";
import { Product } from "../../shared/classes/product";
import { environment} from '../../../environments/environment.prod';

/*Matomo */
import { Angulartics2 } from 'angulartics2';
import { Angulartics2Piwik } from 'angulartics2/piwik'

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  public products: Product[] = [];
public serverIp = environment.serverIP
  constructor(public productService: ProductService,
    private angulartics2: Angulartics2 ,
    private angulartics2Piwik:  Angulartics2Piwik,) {
    this.productService.cartItems.subscribe(response => this.products = response);
  }



  ngOnInit(): void {
    console.log(this.products);
    var totalPrice;
    var gotTotalPrice = false;

    for(var i in this.products){
      const product = {
        productSKU: this.products[i].id,
        productName: this.products[i].title,
        productCategory: this.products[i].category,
        price: this.products[i].price,
        quantity: this.products[i].quantity
      };
      console.log(product);
      this.angulartics2.eventTrack.next({action: 'addEcommerceItem', properties: product});
    }
    this.getTotal.subscribe(res=>{
      //console.log(res);
      totalPrice = res;
      if(totalPrice!=null){
        gotTotalPrice = true;
      } 
     })
     if(gotTotalPrice){
       console.log('Total Price:', totalPrice);
        this.angulartics2.eventTrack.next({action: 'trackEcommerceCartUpdate', properties: {grandTotal:totalPrice}});
     }

  }

  public get getTotal(): Observable<number> {
    return this.productService.cartTotalAmount();
  }

  // Increament
  increment(product, qty = 1) {
    this.productService.updateCartQuantity(product, qty);
  }

  // Decrement
  decrement(product, qty = -1) {
    this.productService.updateCartQuantity(product, qty);
  }

  public removeItem(product: any) {
    this.productService.removeCartItem(product);
  }

}
