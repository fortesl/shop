import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class CurrentRouteService {
  constructor() { }

  private _currentUrl = new Subject<string>();
  currentUrl$: Observable<string> = this._currentUrl.asObservable();

  set url(url: string) {
    this._currentUrl.next(url);
  }

}
