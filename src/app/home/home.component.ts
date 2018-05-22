import { Component } from '@angular/core';
import { CurrentRouteService } from '../common/services/current-route.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  constructor(currentRoute: CurrentRouteService) {
    currentRoute.url = location.pathname;
  }
}
