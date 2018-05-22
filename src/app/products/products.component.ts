import { Component, OnInit } from '@angular/core';
import { CurrentRouteService } from '../common/services/current-route.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  constructor(currentRoute: CurrentRouteService) {
    currentRoute.url = location.pathname;
  }

  ngOnInit() {
  }

}
