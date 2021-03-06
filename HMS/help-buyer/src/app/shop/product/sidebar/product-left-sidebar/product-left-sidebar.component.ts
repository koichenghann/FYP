import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductDetailsMainSlider, ProductDetailsThumbSlider } from '../../../../shared/data/slider';
import { Product } from '../../../../shared/classes/product';
import { ProductService } from '../../../../shared/services/product.service';
import { SizeModalComponent } from "../../../../shared/components/modal/size-modal/size-modal.component";
import { RecommendationService } from 'src/app/shared/services/recommendation.service';

/*Matomo */
import { Angulartics2 } from 'angulartics2';
import { Angulartics2Piwik } from 'angulartics2/piwik'

@Component({
  selector: 'app-product-left-sidebar',
  templateUrl: './product-left-sidebar.component.html',
  styleUrls: ['./product-left-sidebar.component.scss']
})
export class ProductLeftSidebarComponent implements OnInit {

  public product: Product = {};
  public counter: number = 1;
  public activeSlide: any = 0;
  public selectedSize: any;
  public mobileSidebar: boolean = false;

  @ViewChild("sizeChart") SizeChart: SizeModalComponent;

  public ProductDetailsMainSliderConfig: any = ProductDetailsMainSlider;
  public ProductDetailsThumbConfig: any = ProductDetailsThumbSlider;

  constructor(private route: ActivatedRoute, private router: Router,
    public productService: ProductService, public recoService: RecommendationService,
    private angulartics2: Angulartics2 ,
    private angulartics2Piwik:  Angulartics2Piwik,
    ) {
      this.route.data.subscribe(response => {
        this.product = response.data
        this.recoService.rateProduct(response.data['_id'], 2)
      });

    }

  ngOnInit(): void {
    console.log('Yes this at product-left-sidebar');
    console.log(this.product.title);

    /*
    for(var i in this.products){
      console.log(this.products[i]);
    }*/

    const product = {
      productSKU: this.product.id,
      productName: this.product.title,
      productCategory: this.product.category,
      price: this.product.price ,
      quantity: this.product.stock
    };

    const ecommerceViewDescription = product;

    this.angulartics2.eventTrack.next({action: 'setEcommerceView', properties: ecommerceViewDescription});

  }

  // Get Product Color
  Color(variants) {
    const uniqColor = []
    for (let i = 0; i < Object.keys(variants).length; i++) {
      if (uniqColor.indexOf(variants[i].color) === -1 && variants[i].color) {
        uniqColor.push(variants[i].color)
      }
    }
    return uniqColor
  }

  // Get Product Size
  Size(variants) {
    const uniqSize = []
    for (let i = 0; i < Object.keys(variants).length; i++) {
      if (uniqSize.indexOf(variants[i].size) === -1 && variants[i].size) {
        uniqSize.push(variants[i].size)
      }
    }
    return uniqSize
  }

  selectSize(size) {
    this.selectedSize = size;
  }

  // Increament
  increment() {
    this.counter++ ;
  }

  // Decrement
  decrement() {
    if (this.counter > 1) this.counter-- ;
  }

  // Add to cart
  async addToCart(product: any) {
    product.quantity = this.counter || 1;
    const status = await this.productService.addToCart(product);
    if(status){
      console.log('Added to cart!');
      const product = {
        productSKU: this.product.id,
        productName: this.product.title,
        productCategory: this.product.category,
        price: this.product.price ,
        quantity: this.product.stock
      };
      console.log(product);
      this.angulartics2.eventTrack.next({action: 'addEcommerceItem', properties: product});
      this.router.navigate(['/shop/cart']);
    }

  }

  // Buy Now
  async buyNow(product: any) {
    product.quantity = this.counter || 1;
    const status = await this.productService.addToCart(product);
    if(status)
      this.router.navigate(['/shop/checkout']);
  }

  // Add to Wishlist
  addToWishlist(product: any) {
    this.productService.addToWishlist(product);
  }

  // Toggle Mobile Sidebar
  toggleMobileSidebar() {
    this.mobileSidebar = !this.mobileSidebar;
  }

}
