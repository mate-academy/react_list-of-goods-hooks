import React from 'react';
import { Goods } from '../../types/Goods';

type Props = {
  goods: Goods;
};
export const GoodsList: React.FC<Props> = ({ goods }) => {
  return (
    <ul>
      <ul>
        {goods.map(good => (
          <li data-cy="Good" key={good}>
            {good}
          </li>
        ))}
      </ul>
    </ul>
  );
};
