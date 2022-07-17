import React from 'react';
import './GoodsList.css';

export type Goods = {
  goods: string[]
};

export const GoodsList: React.FC<Goods> = ({ goods }) => {
  return (
    <ul className="list">
      {goods.map(good => (
        <li
          className="subtitle is-5"
          key={good}
        >
          {good}
        </li>
      ))}
    </ul>
  );
};
