import React from 'react';

import { GoodsItem } from '../GoodsItem/GoodsItem';

type Props = {
  goods: string[],
};

export const GoodsList: React.FC<Props> = ({ goods }) => (
  <ul>
    {goods.map(good => (
      <GoodsItem good={good} key={good} />
    ))}
  </ul>
);
