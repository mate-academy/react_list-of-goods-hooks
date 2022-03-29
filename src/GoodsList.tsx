import React from 'react';

const GoodsList: React.FC<Products> = ({ products }) => {
  return (
    <ul>
      {products.map(product => (
        <li key={product}>
          {product}
        </li>
      ))}
    </ul>
  );
};

export default React.memo(GoodsList);
