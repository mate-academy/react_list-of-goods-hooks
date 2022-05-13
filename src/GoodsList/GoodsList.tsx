import React from 'react';

import './GoodList.scss';

interface Props {
  goodsList: string[];
}

export const GoodsList: React.FC<Props> = ({ goodsList }) => (
  <>
    <h1 className="goods__title">Goods</h1>
    <ul className="goods__list">
      {goodsList.map(good => (
        <li
          className="goods__item"
          key={good}
        >
          {good}
        </li>
      ))}
    </ul>
  </>
);
