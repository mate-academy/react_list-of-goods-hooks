import React from 'react';
import { GoodsItem } from '../GoodsItem';

type Props = {
  goods: string[];
};

export const GoodList: React.FC<Props> = ({ goods }) => (
  <ul>
    <ul>
      {goods.map(good => (
        <GoodsItem key={good} label={good} />
      ))}
    </ul>
  </ul>
);
