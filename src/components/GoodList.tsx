import React from 'react';
import { Goods } from '../Goods';

type Props = {
  goods: Goods;
};

export const GoodList: React.FC<Props> = ({ goods }) => (
  <ul>
    {goods.map(good => (
      <li key={good} data-cy="Good">{good}</li>
    ))}
  </ul>
);
