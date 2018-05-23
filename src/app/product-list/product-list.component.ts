import { Component, ViewChild, AfterViewInit, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import { Product, DisplayMode, DisplayModes } from '../models/product';
import { ProductService } from '../common/services/product.service';
import { CurrentRouteService } from '../common/services/current-route.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-product-list',
  styleUrls: ['./product-list.component.scss'],
  templateUrl: './product-list.component.html',
})
export class ProductListComponent implements OnInit, OnDestroy {
  displayedColumns = ['image', 'title', 'price'];
  dataSource: MatTableDataSource<Product>;
  @Output() update = new EventEmitter<DisplayMode>();
  _subscription: Subscription;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private productService: ProductService, public currentRoute: CurrentRouteService, private router: Router) {
  }

  ngOnInit(): void {
    this._subscription = this.productService.products$
      .subscribe(products => {
        this.dataSource = new MatTableDataSource(products);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    });
  }

  ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }

  edit(product: Product) {
    if (this.currentRoute.url === '/products') {
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
