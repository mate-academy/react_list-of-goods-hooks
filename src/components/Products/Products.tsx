import React from 'react';
import './Products.scss';

export const Products: React.FC<{ products: string[] }> = ({ products }) => (
  <ul className="productList">
    {products.map(product => (
      <li
        data-cy="Good"
        className="productList__item"
        key={product}
      >
        {product}
      </li>
    ))}
  </ul>
);
