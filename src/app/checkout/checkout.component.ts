import { Component, OnInit } from '@angular/core';
import { CurrentRouteService } from '../common/services/current-route.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {

  constructor(currentRoute: CurrentRouteService) {
    currentRoute.url = location.pathname;
  }

  ngOnInit() {
  }

}
