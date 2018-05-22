import { Component, OnInit } from '@angular/core';
import { NavItem } from './nav-item';
import { Router } from '@angular/router';
import { AuthService } from '../common/services/auth.service';
import { CurrentRouteService } from '../common/services/current-route.service';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.scss']
})
export class NavigationBarComponent implements OnInit {
  constructor(private router: Router, private currentRoute: CurrentRouteService, public auth: AuthService) {
  }

  userMenuSelection: NavItem;
  currentUrl: string;

  navLinks = [
    { label: 'Home', path: ['/'], icon: 'home' },
    { label: 'Shopping Cart', path: ['/cart'], icon: 'shopping_cart' },
    { label: 'Products', path: ['/products'], icon: ''}
  ];

  loggedInUserMenu: NavItem = {
    label: 'UserName',
    items: [
      { label: 'My Orders', path: ['/orders'] },
      { label: 'Manage Orders', path: ['/admin/orders'], roles: ['admin'] },
      { label: 'Manage Products', path: ['/admin/products'], roles: ['admin'] },
      { label: 'Logout', path: ['/login'] }
    ]
  };

  loggedOutUserMenu: NavItem = {
    label: 'Login',
    path: ['/login']
  };

  ngOnInit() {
    this.currentRoute.currentUrl$
    .subscribe(url => {
      this.currentUrl = url;
      this.userMenuSelection = this.loggedInUserMenu.items.find(item => {
        return item.path.includes(url);
      });
    });
  }

  login() {
    this.router.navigate(this.loggedOutUserMenu.path);
  }

  onUserMenuClick(item: NavItem) {
    if (item.label === 'Logout') {
      this.auth.logout()
        .then(() => {
          this.router.navigate(item.path);
        });
    } else {
      this.router.navigate(item.path);
    }
  }

  isAuthorized(itemRoles: any[]): boolean {
    const roles = itemRoles.filter((role) => this.auth.loggedInUser.roles.includes(role));
    return roles.length > 0;
  }

}
