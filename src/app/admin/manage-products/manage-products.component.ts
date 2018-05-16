import { Component, ViewChild, AfterViewInit } from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';

/**
 * @title Data table with sorting, pagination, and filtering.
 */
@Component({
  selector: 'app-manage-products',
  styleUrls: ['./manage-products.component.scss'],
  templateUrl: './manage-products.component.html',
})
export class ManageProductsComponent implements AfterViewInit {
  displayedColumns = ['id', 'title', 'price'];
  dataSource: MatTableDataSource<Product>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor() {
    // Create 100 users
    const users: Product[] = [];
    for (let i = 1; i <= 100; i++) { users.push(createNewProduct(i)); }

    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource(users);
  }

  /**
   * Set the paginator and sort after the view init since this component will
   * be able to query its view for the initialized paginator and sort.
   */
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }
}

/** Builds and returns a new product. */
function createNewProduct(id: number): Product {
  const name =
      NAMES[Math.round(Math.random() * (NAMES.length - 1))] + ' ' +
      NAMES[Math.round(Math.random() * (NAMES.length - 1))].charAt(0) + '.';

  return {
    id: id.toString(),
    title: name,
    price: Math.random() * 5000
  };
}

const NAMES = ['Maia', 'Asher', 'Olivia', 'Atticus', 'Amelia', 'Jack',
  'Charlotte', 'Theodore', 'Isla', 'Oliver', 'Isabella', 'Jasper',
  'Cora', 'Levi', 'Violet', 'Arthur', 'Mia', 'Thomas', 'Elizabeth'];

export interface Product {
  id: string;
  title: string;
  price: number;
}
