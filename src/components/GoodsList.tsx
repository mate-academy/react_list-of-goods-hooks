import React from 'react';

const GoodsList: React.FC<Products> = ({ products }) => {
  return (
    <ul>
      {products.map(good => (
        <li key={good}>
          {good}
        </li>
      ))}
    </ul>
  );
};

export default React.memo(GoodsList);
