import React from 'react';
import { Product } from '../types/Product';

interface Props {
  products: Product[];
}

export const ProductList: React.FC<Props> = ({ products }) => (
  <ul>
    {products.map(product => (
      <li data-cy="Good" key={product.id}>
        {product.title}
      </li>
    ))}
  </ul>
);
