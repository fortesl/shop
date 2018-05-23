import { Component, OnInit, OnDestroy } from '@angular/core';
import { Product } from '../models/product';
import { ProductService } from '../common/services/product.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit, OnDestroy {

  constructor(private productService: ProductService, private route: ActivatedRoute) { }

  product: Product;
  private _subscription: Subscription;

  ngOnInit() {
    this._subscription = this.productService.getProduct(this.route.snapshot.params['id'])
      .subscribe(product => this.product = product);
  }

  ngOnDestroy() {
    this._subscription.unsubscribe();
  }

}
