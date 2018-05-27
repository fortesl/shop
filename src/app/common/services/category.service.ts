import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from '@firebase/util';
import { Product } from '../../models/product';

@Injectable()
export class CategoryService {

  constructor(db: AngularFireDatabase) {
    this._categories$ = db.list('categories').valueChanges();
  }
  private _categories$;

  get categories$() {
    return this._categories$;
  }
}
