export interface Product {
  id: number;
  name: string;
  price: number;
}

export enum SortType {
  Default = '',
  Name = 'name',
  Price = 'price',
  Length = 'length',
}
