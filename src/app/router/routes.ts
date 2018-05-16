import { ShoppingCartComponent } from '../shopping-cart/shopping-cart.component';
import { NotFoundComponent } from '../not-found/not-found.component';
import { HomeComponent } from '../home/home.component';
import { MyOrdersComponent } from '../my-orders/my-orders.component';
import { ManageProductsComponent } from '../admin/manage-products/manage-products.component';
import { ManageOrdersComponent } from '../admin/manage-orders/manage-orders.component';
import { ProductsComponent } from '../products/products.component';
import { LoginComponent } from '../login/login.component';
import { CheckoutComponent } from '../checkout/checkout.component';
import { AuthGuard } from './auth-guard';
import { Route } from '@angular/router';
import { NotAuthorizedComponent } from '../not-authorized/not-authorized.component';
import { AdminAuthGuard } from './admin-auth-guard';

export const routes: Route[] = [
  { path: '',  redirectTo: 'home', pathMatch: 'full' },
  {path: 'home', component: HomeComponent},
  { path: 'cart', component: ShoppingCartComponent },
  { path: 'products', component: ProductsComponent },
  { path: 'login', component: LoginComponent },
  { path: 'not-authorized', component: NotAuthorizedComponent},
  { path: 'orders', component: MyOrdersComponent, canActivate: [AuthGuard, AdminAuthGuard] },
  { path: 'checkout', component: CheckoutComponent, canActivate: [AuthGuard]  },
  { path: 'admin/orders', component: ManageOrdersComponent, canActivate: [AuthGuard, AdminAuthGuard] },
  { path: 'admin/products', component: ManageProductsComponent, canActivate: [AuthGuard, AdminAuthGuard] },
  { path: '**', component: NotFoundComponent }
];
