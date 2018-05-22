import { Component, OnInit } from '@angular/core';
import { CurrentRouteService } from '../common/services/current-route.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent implements OnInit {

  constructor(currentRoute: CurrentRouteService) {
    currentRoute.url = location.pathname;
  }

  ngOnInit() {
  }

}
