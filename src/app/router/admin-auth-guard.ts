import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../common/services/auth.service';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';
import { UserService } from '../common/services/user.service';

@Injectable()
export class AdminAuthGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router, private userService: UserService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.auth.isLoggedInUser$
      .switchMap(user => this.userService.get(user.uid))
      .map(user => {
        const allowed = user.roles.includes('admin');
        if (!allowed) {
          this.router.navigate(['not-authorized']);
        }
        return allowed;
      });
  }
}
