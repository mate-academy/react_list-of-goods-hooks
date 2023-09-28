import React from 'react';
import { Goods } from '../../types/Goods';

type Props = {
  visibleGoods: Goods;
};

export const GoodList: React.FC<Props> = ({ visibleGoods }) => (
  <ul>
    {visibleGoods.map((good) => (
      <li data-cy="Good" key={good}>
        {good}
      </li>
    ))}
  </ul>
);
