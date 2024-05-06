import { GoodItem } from '../GoodItem/GoodItem';
import { ProductList } from '../types/ProductList';

export const GoodList = ({ goods }: ProductList) => {
  return goods.map((product, index) => (
    <GoodItem product={product} key={index} />
  ));
};
