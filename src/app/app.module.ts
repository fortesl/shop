import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ShopMaterialModule } from './common/shop-material/shop-material.module';
import { RouterModule, RouterStateSnapshot } from '@angular/router';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';

import { routes } from './router/routes';
import { AppComponent } from './app.component';
import { NavigationBarComponent } from './navigation-bar/navigation-bar.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { HomeComponent } from './home/home.component';
import { environment } from '../environments/environment';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { ManageOrdersComponent } from './admin/manage-orders/manage-orders.component';
import { ManageProductsComponent } from './admin/manage-products/manage-products.component';
import { ProductsComponent } from './products/products.component';
import { LoginComponent } from './login/login.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { AuthService } from './common/services/auth.service';
import { AppErrorHandler } from './common/error-handling/app-error-handler';
import { AuthGuard } from './router/auth-guard';
import { NotAuthorizedComponent } from './not-authorized/not-authorized.component';
import { UserService } from './common/services/user.service';
import { AdminAuthGuard } from './router/admin-auth-guard';
import { CurrentRouteService } from './common/services/current-route.service';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ProductUpdateComponent } from './admin/manage-products/product-update/product-update.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductService } from './common/services/product.service';
import { CurrencyPipe } from '@angular/common';
import { CategoryService } from './common/services/category.service';

@NgModule({
  declarations: [
    AppComponent,
    NavigationBarComponent,
    ShoppingCartComponent,
    NotFoundComponent,
    HomeComponent,
    MyOrdersComponent,
    ManageOrdersComponent,
    ManageProductsComponent,
    ProductsComponent,
    LoginComponent,
    CheckoutComponent,
    NotAuthorizedComponent,
    ProductDetailsComponent,
    ProductUpdateComponent,
    ProductListComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ShopMaterialModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    RouterModule.forRoot(routes),
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    { provide: ErrorHandler, useClass: AppErrorHandler},
    AuthService,
    AuthGuard,
    UserService,
    AdminAuthGuard,
    CurrentRouteService,
    ProductService,
    CurrencyPipe,
    CategoryService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
