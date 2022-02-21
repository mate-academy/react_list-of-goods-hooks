import React from 'react';
import './GoodsList.scss';

type Props = {
  goods: string[]
};

export const GoodsList: React.FC<Props> = ({ goods }) => (
  <ul className="Goods">
    {goods.map(product => {
      return (
        <li
          key={product}
          className="Goods__item"
        >
          {product}
        </li>
      );
    })}
  </ul>
);
