import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecommendationServiceService {
    constructor(public http: HttpClient, private router: Router) { }


    configUrl = 'http://127.0.0.1:5000/';
    fetchedProducts;
    currentUser;

    private orders_retrieved_listener = new Subject<any>();
    get_orders_retrieved_listener() {
      return this.orders_retrieved_listener.asObservable();
    }
    private refresh_listener2 = new Subject<any>();
    get_refreh_listener2() {
      return this.refresh_listener2.asObservable();
    }
    private refresh_listener = new Subject<any>();
    get_refreh_listener() {
      return this.refresh_listener.asObservable();
    }
    getOrders() {
      this.http.post(this.configUrl + '/ordersDetails', {username: localStorage.getItem("username")}).subscribe(
        response => {
          if (response) {
            this.orders_retrieved_listener.next(response)
            // console.log(response)
          }
          else {
            alert('no orders retrieved');
          }
        }
      );
    }

    refreshChart(chart) {
      this.refresh_listener.next(chart)
    }
    refreshChart2(data) {
      this.refresh_listener2.next(data)
    }

    // private recommendations_retrieved_listener = new Subject<any>();
    // private products_retrieved_listener = new Subject<any>();

    // get_recommendations_retrieved_listener() {
    //   return this.recommendations_retrieved_listener.asObservable();
    // }
    // get_products_retrieved_listener() {
    //   return this.products_retrieved_listener.asObservable();
    // }


    // getRecommendations() {
    //   this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    //   this.http.get(this.configUrl + 'predictions/' + this.currentUser['_id']).subscribe(
    //     response => {
    //       // alert(JSON.stringify(response))
    //       this.recommendations_retrieved_listener.next(response)
    //       this.fetchedProducts = response
    //     }
    //   );
    // }
    //
    // getProducts() {
    //   this.http.get(this.configUrl + '/products/').subscribe(
    //     response => {
    //       this.products_retrieved_listener.next(response)
    //       this.fetchedProducts = response
    //     }
    //   );
    // }
    //
    // rateProduct(product, rating) {
    //   this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    //   this.http.post(this.configUrl + '/rate', {product: product, user: this.currentUser._id, rating: rating }).subscribe(
    //     response => {
    //       // alert(JSON.stringify(response));
    //       // this.products_retrieved_listener.next(response)
    //       // this.fetchedProducts = response
    //     }
    //   );
    // }
  }
