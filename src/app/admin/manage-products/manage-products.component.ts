import { Component } from '@angular/core';
import { CurrentRouteService } from '../../common/services/current-route.service';
import { Product, DisplayMode, DisplayModes } from '../../models/product';
import { ProductService } from '../../common/services/product.service';

@Component({
  selector: 'app-manage-products',
  styleUrls: ['./manage-products.component.scss'],
  templateUrl: './manage-products.component.html',
})
export class ManageProductsComponent {
  displayMode: DisplayMode = {mode: DisplayModes.List, product: null};

  constructor(currentRoute: CurrentRouteService, public productService: ProductService) {
    currentRoute.url = location.pathname;
    if (!productService.products) {
      productService.loadProducts();
    }
  }

  add() {
    this.displayMode.mode = DisplayModes.Add;
  }

  setDisplayMode(mode?: DisplayMode) {
    if (!mode) {
      this.displayMode = {mode: DisplayModes.List, product: null};
    } else {
      this.displayMode = mode;
    }
  }
}
