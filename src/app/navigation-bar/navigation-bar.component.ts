import { Component } from '@angular/core';
import { NavItem } from './nav-item';
import { Router } from '@angular/router';
import { AuthService } from '../common/services/auth.service';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.scss']
})
export class NavigationBarComponent {
  constructor(private router: Router, public auth: AuthService) {
    this.userMenuSelection = this.loggedInUserMenu.items[this.loggedInUserMenu.items.length - 1];
  }

  userMenuSelection: NavItem;

  navLinks = [
    { label: 'Home', path: ['/'], icon: 'home' },
    { label: 'Shopping Cart', path: ['/cart'], icon: 'shopping_cart' }
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

  login() {
    this.router.navigate(this.loggedOutUserMenu.path);
  }

  onUserMenuClick(item: NavItem) {
    if (item.label === 'Logout') {
      this.auth.logout()
        .then(() => {
          this.userMenuSelection = item;
          this.router.navigate(item.path);
        });
    } else {
      this.userMenuSelection = item;
      this.router.navigate(item.path);
    }
  }

  isAuthorized(itemRoles: any[]): boolean {
    const roles = itemRoles.filter((role) => this.auth.loggedInUser.roles.includes(role));
    return roles.length > 0;
  }

}
