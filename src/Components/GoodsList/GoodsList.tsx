import React from 'react';
import { GoodsCard } from '../GoodsCard';

type Props = {
  goods: string[],
};

export const GoodsList: React.FC<Props> = ({ goods }) => (
  <ul>
    {goods.map(good => (
      <GoodsCard good={good} key={good} />
    ))}
  </ul>
);
