import React from 'react';

type Props = {
  products: string[],
};

const Product: React.FC<Props> = ({ products }) => {
  return (
    <ul className="app__list">
      {products.map(product => (
        <li className="app__product" key={product}>
          {product}
        </li>
      ))}
    </ul>
  );
};

export default Product;
