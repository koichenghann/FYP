import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RecommendationService {
  configUrl = 'http://127.0.0.1:5000/';

  constructor(public http: HttpClient) { }


  rateProduct(product, rating) {
    const uid = localStorage.getItem('uid');
    this.http.post(this.configUrl + '/rate', {product: product, user: uid, rating: rating }).subscribe(
      response => {
      }
    );
  }
}
