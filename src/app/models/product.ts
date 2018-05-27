export interface Product {
  id: string;
  imageUrl: string;
  title: string;
  price: number;
  category: string;
}

export enum DisplayModes {
  List,
  Edit,
  Add
}

export interface DisplayMode {
  mode: DisplayModes;
  product: Product;
}
