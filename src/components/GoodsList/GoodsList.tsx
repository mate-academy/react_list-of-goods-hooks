import React from 'react';

import { Good } from '../../types/Good';
import { GoodCard } from '../GoodCard/GoodCard';

type Props = {
  goods: Good[];
};

export const GoodsList: React.FC<Props> = ({ goods }) => (
  <ul className="GoodsList">
    {goods.map(good => (
      <GoodCard good={good} key={good.id} />
    ))}
  </ul>
);
