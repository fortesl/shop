import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
import * as firebase from 'firebase';
import { AuthService } from './auth.service';
import { LoggedInUser } from '../models/logged-in-user';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

@Injectable()
export class UserService {

  constructor(private db: AngularFireDatabase, private auth: AuthService ) { }

  save(user: firebase.User) {
    const appUser: LoggedInUser = {
      name: user.displayName,
      email: user.email,
      roles: ['user']
    };
    const clearSub: Subscription = this.get(user.uid)
    .subscribe(x => {
      if (x) {
        appUser.roles = x.roles;
      }
      this.auth.setLoggedInUser(appUser);
      this.db.object('/users/' + user.uid).update(appUser);
    });
  }

  get(uid: string): Observable<LoggedInUser> {
    return this.db.object('/users/' + uid).valueChanges() as Observable<LoggedInUser>;
  }
}
