import { Product } from '../types/Product';

export interface GoodItemProps {
  product: Product;
}

export const GoodItem = ({ product }: GoodItemProps) => {
  return <li data-cy="Good">{product}</li>;
};
