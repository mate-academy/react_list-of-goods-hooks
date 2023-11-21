import React from 'react';
import { GoodsItem } from '../GoodsItem';

type Props = {
  goods: string[]
};

export const GoodsList: React.FC<Props> = ({ goods }) => (
  <ul className="Goodsist">
    {goods.map(good => (
      <GoodsItem
        key={good}
        good={good}
      />
    ))}
  </ul>
);
