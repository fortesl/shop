import { Component } from '@angular/core';
import { AuthService } from '../common/services/auth.service';
import { CurrentRouteService } from '../common/services/current-route.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  constructor(private auth: AuthService, currentRoute: CurrentRouteService) {
    currentRoute.url = location.pathname;
  }

  loginWithGoogle() {
    this.auth.login();
  }
}
