import React, { FC } from 'react';
import { GoodsItem } from '../GoodsItem/GoodsItem';

type Props = {
  goods: string[]
}

export const GoodsList: FC<Props> = ({ goods }) => {
  return (
    <ul>
      {goods.map(good => (
        <GoodsItem good={good} key={good} />
      ))}
    </ul>
  );
};