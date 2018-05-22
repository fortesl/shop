import { Component, ViewChild, AfterViewInit, Output, EventEmitter } from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import { Product, DisplayMode, DisplayModes } from '../models/product';
import { ProductService } from '../common/services/product.service';
import { CurrentRouteService } from '../common/services/current-route.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-list',
  styleUrls: ['./product-list.component.scss'],
  templateUrl: './product-list.component.html',
})
export class ProductListComponent implements AfterViewInit {
  displayedColumns = ['image', 'title', 'price'];
  dataSource: MatTableDataSource<Product>;
  @Output() update = new EventEmitter<DisplayMode>();
  currentUrl: string;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(productService: ProductService, currentRoute: CurrentRouteService, private router: Router) {
    currentRoute.url = location.pathname;
    this.currentUrl = location.pathname;
    if (!productService.products) {
      productService.loadProducts();
    }

    this.dataSource = new MatTableDataSource(productService.products);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }

  edit(product: Product) {
    if (this.currentUrl === '/products') {
      this.router.navigate(['/products', product.id]);
    } else {
      const displayMode: DisplayMode = {
        mode: DisplayModes.Edit,
        product: product
      };
      this.update.emit(displayMode);
    }
  }
}
