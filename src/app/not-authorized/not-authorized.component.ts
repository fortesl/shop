import { Component, OnInit } from '@angular/core';
import { CurrentRouteService } from '../common/services/current-route.service';

@Component({
  selector: 'app-not-authorized',
  templateUrl: './not-authorized.component.html',
  styleUrls: ['./not-authorized.component.scss']
})
export class NotAuthorizedComponent implements OnInit {

  constructor(currentRoute: CurrentRouteService) {
    currentRoute.url = location.pathname;
  }

  ngOnInit() {
  }

}
