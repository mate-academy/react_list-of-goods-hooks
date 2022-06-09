import React from 'react';
import './GoodsList.css';

type Props = {
  goods: string[],
};

export const GoodsList: React.FC<Props> = ({ goods }) => {
  return (
    <div className="GoodsList">
      {goods.map(product => (
        <li key={product}>
          {product}
        </li>
      ))}
    </div>
  );
};
