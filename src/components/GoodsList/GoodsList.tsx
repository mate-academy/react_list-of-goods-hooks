import React from 'react';

interface Props {
  products: string[],
}

export const GoodsList: React.FC<Props> = ({ products }) => {
  return (
    <ul className="d-flex flex-column list-unstyled">
      {products.map(product => (
        <li key={product} className="mb-3">
          {product}
        </li>
      ))}
    </ul>
  );
};
