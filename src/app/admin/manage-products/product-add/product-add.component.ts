import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { Product, DisplayMode, DisplayModes } from '../../../models/product';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../../../common/services/product.service';
import { CurrencyPipe } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.scss']
})
export class ProductAddComponent implements OnInit {

  constructor(private builder: FormBuilder,
    private currency: CurrencyPipe,
    private router: Router,
    private productService: ProductService) { }
  form: FormGroup;
  @Input() displayMode: DisplayMode;
  @Output() update = new EventEmitter();

  ngOnInit() {
    let title = '', imageUrl = '', price = 0;
    if (this.displayMode.product) {
      this.productService.currentProduct = this.displayMode.product;
      title = this.displayMode.product.title;
      price = this.displayMode.product.price;
      imageUrl = this.displayMode.product.imageUrl;
    }

    this.form = this.builder.group({
      title: [title || '', [
        Validators.required,
        Validators.minLength(2)]
      ],
      price: [price || '', [
        Validators.required,
        Validators.pattern('[0-9.]*')
      ]],
      imageUrl: [imageUrl || '', [
        Validators.required,
        Validators.minLength(5)]
      ]
    });
  }

submit(product: Product) {
  if (this.displayMode.mode === DisplayModes.Add) {
    product = this.productService.addProduct(product);
  } else {
    product.id = this.displayMode.product.id;
    product = this.productService.editProduct(product);
  }
  this.update.emit();
  this.router.navigate(['/products', product.id]);
}

delete(event: Event) {
  event.preventDefault();
  this.productService.deleteProduct(this.displayMode.product.id);
  this.update.emit();
}

cancel(event) {
    event.preventDefault();
    this.update.emit();
  }
}
