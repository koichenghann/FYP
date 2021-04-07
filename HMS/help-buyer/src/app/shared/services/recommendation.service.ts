import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecommendationService {
  configUrl = 'http://127.0.0.1:5000/';

  private recommendations_retrieved_listener = new Subject<any>();
  get_recommendations_retrieved_listener() {
    return this.recommendations_retrieved_listener.asObservable();
  }

  constructor(public http: HttpClient) { }

  getRecommendations() {
    console.log('get recommendation ran');
    const uid = localStorage.getItem('uid');
    this.http.get(this.configUrl + 'predictions/' + uid).subscribe(
      response => {
        // alert(JSON.stringify(response))
        this.recommendations_retrieved_listener.next(response)
        console.log(response);
        // this.fetchedProducts = response
      }
    );
  }


  rateProduct(product, rating) {
    const uid = localStorage.getItem('uid');
    this.http.post(this.configUrl + '/rate', {product: product, user: uid, rating: rating }).subscribe(
      response => {
      }
    );
  }
}
