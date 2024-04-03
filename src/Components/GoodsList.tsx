import React from 'react';

import { Good } from './Good';

type GoodsListProps = {
  goods: string[];
};

export const GoodsList: React.FC<GoodsListProps> = ({ goods }) => {
  return (
    <ul>
      {goods.map(good => (
        <Good key={good} good={good} />
      ))}
    </ul>
  );
};
