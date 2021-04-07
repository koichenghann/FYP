import { Component, OnInit, Input } from '@angular/core';
import { Product } from '../../../../shared/classes/product';
import { ProductService } from '../../../../shared/services/product.service';
import { Subscription } from 'rxjs';
import { RecommendationService } from '../../../../shared/services/recommendation.service'

@Component({
  selector: 'app-related-product',
  templateUrl: './related-product.component.html',
  styleUrls: ['./related-product.component.scss']
})
export class RelatedProductComponent implements OnInit {

  @Input() type: string
  loading = false;
  recommendations_retrieved_listener: Subscription;

  public products: Product[] = []; //6 PRODUCT TO VIEW

  constructor(public productService: ProductService, public recoService: RecommendationService) {
    // this.productService.getProducts.subscribe(response =>
    //   this.products = response.filter(item => item.type == this.type)
    // );
    this.products = JSON.parse(localStorage.getItem('products'));
  }

  ngOnInit(): void {
    this.recommendations_retrieved_listener = this.recoService.get_recommendations_retrieved_listener().subscribe(response => {
      // this.products = response
      // alert(JSON.stringify(response))
      this.loading = false;
    })
    this.loading = true;
    // this.productsService.getRecommendations();
    this.recoService.getRecommendations();
  }

  ngOnDestroy(){
    this.recommendations_retrieved_listener.unsubscribe();
  }

}