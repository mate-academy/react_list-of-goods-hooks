import React from 'react';
import { GoodsItem } from '../../GoodsItem/GoodsItem';

type Props = {
  goodsList: string[];
};

export const GoodList: React.FC<Props> = ({ goodsList }) => {
  return (
    <ul>
      {goodsList.map(good => (
        <GoodsItem goodsItem={good} key={good} />
      ))}
    </ul>
  );
};
