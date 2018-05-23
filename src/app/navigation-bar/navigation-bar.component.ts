import { Component } from '@angular/core';
import { NavItem } from './nav-item';
import { Router, NavigationEnd } from '@angular/router';
import { AuthService } from '../common/services/auth.service';
import { CurrentRouteService } from '../common/services/current-route.service';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.scss']
})
export class NavigationBarComponent {
  constructor(private router: Router, currentRoute: CurrentRouteService, public auth: AuthService) {
    router.events
      .subscribe(event => {
        if (event instanceof NavigationEnd) {
          currentRoute.url = event.url;
          this.setUserMenuSelection(event.url);
        }
      });
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

  private setUserMenuSelection(currentUrl: string) {
      this.userMenuSelection = this.loggedInUserMenu.items.find(item => {
        return item.path.includes(currentUrl);
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
