import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../common/services/auth.service';
import { QueryParams } from '@firebase/database/dist/src/core/view/QueryParams';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable <boolean> {
    return this.auth.isLoggedInUser$.map( user => {
      if (!user) {
        this.router.navigate(['/login'], {
          queryParams: { returnUrl: state.url }
        });
        return false;
      }
      return true;
    });
  }
}
