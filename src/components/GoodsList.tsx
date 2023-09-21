import React from 'react';
import './GoodsList.scss';

interface Props {
  goods: string[];
}

export const GoodsList: React.FC<Props> = ({ goods }) => (
  <ul className="Goods">
    {goods.map(good => (
      <li
        data-cy="Good"
        className="Goods__item box"
        key={good}
      >
        {good}
      </li>
    ))}
  </ul>
);
