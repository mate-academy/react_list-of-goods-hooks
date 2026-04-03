import React from 'react';
import { Product } from './types';

type Props = {
  products: Product[];
};

export const ProductList: React.FC<Props> = ({ products }) => (
  <ul className="list" data-cy="ProductList">
    {products.map(product => (
      <li key={product.id} data-cy="Good">
        {product.name}
      </li>
    ))}
  </ul>
);
