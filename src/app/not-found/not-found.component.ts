import { Component, OnInit } from '@angular/core';
import { CurrentRouteService } from '../common/services/current-route.service';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss']
})
export class NotFoundComponent implements OnInit {

  constructor(currentRoute: CurrentRouteService) {
    currentRoute.url = location.pathname;
  }

  ngOnInit() {
  }

}
