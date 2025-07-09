import React from 'react';
import { GoodsItem } from './GoodsItem';

type Props = {
  goods: string[];
};

export const GoodsList: React.FC<Props> = ({ goods }) => {
  return (
    <ul>
      {goods.map((good, index) => (
        <GoodsItem good={good} key={index} />
      ))}
    </ul>
  );
};
