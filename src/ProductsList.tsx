import React from 'react';

type Props = {
  products: string[]
};

export const ProductsList: React.FC<Props> = ({ products }) => {
  return (
    <ul>
      { products.map(product => (
        <li key={product}>
          {product}
        </li>
      ))}
    </ul>
  );
};
