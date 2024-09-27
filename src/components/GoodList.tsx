import React from 'react';

import { GoodProduct } from './GoodProduct';
import { Good } from '../types/Good';

type Props = {
  goods: Good[];
};

export const GoodList: React.FC<Props> = ({ goods }) => (
  <ul>
    {goods.map(good => (
      <GoodProduct good={good} key={good.id} />
    ))}
  </ul>
);
