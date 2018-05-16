import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { AppError } from '../error-handling/app-error';
import { NotFoundError } from '../error-handling/not-found-error';
import { BadInput } from '../error-handling/bad-input-error';


@Injectable()
export class DataService {
  constructor(private url: string, private http: HttpClient) { }

  get(id?: any) {
    const getUrl = id ? `${this.url}/${id}` : this.url;
    return this.http.get(getUrl)
      .catch(this.handleError);
  }

  post(post: any) {
    return this.http.post(this.url, post)
      .catch(this.handleError);
  }

  delete(id: number) {
    const deleteUrl = `${this.url}/${id}`;
    return this.http.delete(deleteUrl)
      .catch(this.handleError);
  }

  update(post: any) {
    return this.http.put(this.url, post)
      .catch(this.handleError);
  }

  private handleError(error: Response) {
    if (error.status === 400) {
      return Observable.throw(new BadInput());
    } else if (error.status === 404) {
      return Observable.throw(new NotFoundError());
    }
    return Observable.throw(new AppError(error));
  }

}
