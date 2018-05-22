import { Component, OnInit } from '@angular/core';
import { Product } from '../models/product';
import { ProductService } from '../common/services/product.service';
import { ActivatedRoute } from '@angular/router';
import { CurrentRouteService } from '../common/services/current-route.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {

  constructor(private productService: ProductService, private route: ActivatedRoute, currentRoute: CurrentRouteService) {
    currentRoute.url = location.pathname;
  }

  product: Product;

  ngOnInit() {
    this.product = this.productService.getProduct(this.route.snapshot.params['id']);
  }

}
