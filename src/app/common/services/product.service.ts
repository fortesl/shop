import { Injectable } from '@angular/core';
import { Product } from '../../models/product';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';

@Injectable()
export class ProductService {
  constructor(private db: AngularFireDatabase) {
    this._productsRef = this.db.list('products');
    this._products$ = this._productsRef.snapshotChanges().pipe(
      map(changes =>
        changes.map(c => ({ id: c.payload.key, ...c.payload.val() }))
      )
    );
   }
  private _products$: Observable<Product[]>;
  private _productsRef: AngularFireList<Product>;

  get products$(): Observable<Product[]> {
    return this._products$;
  }

  addProduct(product: Product) {
    return this._productsRef.push(product);
  }

  updateProduct(id: string, product: Product): Promise<Product> {
    return this._productsRef.update(id, product)
    .then(updated => {
      product.id = id;
      return product;
    });
  }

  deleteProduct(id: string) {
    return this._productsRef.remove(id);
  }

  getProduct(id: string): Observable<Product> {
    return this.db.object('/products/' + id).valueChanges() as Observable<Product>;
  }

  deleteAll() {
    return this._productsRef.remove();
  }
}
