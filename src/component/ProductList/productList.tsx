import React from 'react';
import './productList.scss';

type Props = {
  products: string[];
};

export const ProductList: React.FC<Props> = ({ products }) => (
  <ul className="ProductList">
    {products.map(product => (
      <li key={product} className="ProductList__li" data-cy="Good">
        {product}
      </li>
    ))}
  </ul>
);
