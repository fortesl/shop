import { Injectable } from '@angular/core';
import { Product } from '../../models/product';

@Injectable()
export class ProductService {

  constructor() { }

  private _products: Product[];
  private _currentProduct: Product;

  loadProducts() {
    this._products = [];
    for (let i = 1; i <= 100; i++) { this.products.push(createNewProduct(i)); }
    this._currentProduct = undefined;
  }

  get products(): Product[] {
    this._currentProduct = undefined;
    return this._products;
  }

  getProduct(id: string): Product {
    if (!this._products) {
      this.loadProducts();
    }
    const idx = this._products.findIndex(item => item.id === id);
    this._currentProduct = this._products[idx];
    return this._currentProduct;
  }

  get currentProduct(): Product {
    return this._currentProduct;
  }

  set currentProduct(product: Product) {
    this._currentProduct = product;
  }

  addProduct(product: Product): Product {
    if (product) {
      product.id = (this._products.length + 1).toString();
      this._products.unshift(product);
      this._currentProduct = product;
      return product;
    }
  }

  editProduct(product: Product): Product {
    const idx = this._products.findIndex(item => item.id === product.id);
    this._products.unshift(product);
    this._products.splice(idx + 1, 1);
    this._currentProduct = product;
    return product;
  }

  deleteProduct(id: string) {
    const idx = this._products.findIndex(item => item.id === id);
    this._products.splice(idx, 1);
    this._currentProduct = undefined;
  }

}

/** Builds and returns a new product. */
function createNewProduct(id: number): Product {
  const name =
      NAMES[Math.round(Math.random() * (NAMES.length - 1))] + ' ' +
      NAMES[Math.round(Math.random() * (NAMES.length - 1))].charAt(0) + '.';

  return {
    id: id.toString(),
    imageUrl: 'http://www.fullersfoodsplc.com/images/products/bakery/bread-buns.jpg',
    title: name,
    price: Math.random() * 5000
  };
}

const NAMES = ['Maia', 'Asher', 'Olivia', 'Atticus', 'Amelia', 'Jack',
  'Charlotte', 'Theodore', 'Isla', 'Oliver', 'Isabella', 'Jasper',
  'Cora', 'Levi', 'Violet', 'Arthur', 'Mia', 'Thomas', 'Elizabeth'];
