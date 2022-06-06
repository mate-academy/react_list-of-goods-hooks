import React from 'react';
import './GoodsList.scss';

type Props = {
  goods: string[],
};

export const GoodsList: React.FC<Props> = ({ goods }) => {
  return (
    <ul className="goods-list">
      {goods.map(good => (
        <li
          className="goods-list__item"
          key={good}
        >
          {good}
        </li>
      ))}
    </ul>
  );
};
