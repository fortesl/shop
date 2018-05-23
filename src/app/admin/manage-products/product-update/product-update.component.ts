import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { Product, DisplayMode, DisplayModes } from '../../../models/product';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../../../common/services/product.service';
import { CurrencyPipe } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-update',
  templateUrl: './product-update.component.html',
  styleUrls: ['./product-update.component.scss']
})
export class ProductUpdateComponent implements OnInit {

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

  get title() {
    return this.form.get('title');
  }

  get price() {
    return this.form.get('price');
  }

  get imageUrl() {
    return this.form.get('imageUrl');
  }

submit(product: Product) {
  if (this.displayMode.mode === DisplayModes.Add) {
    this.productService.addProduct(product)
    .then(saved => {
      this.update.emit();
    });
  } else {
    this.productService.updateProduct(this.displayMode.product.id, product)
    .then(updated => {
      this.update.emit();
    });
  }
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
