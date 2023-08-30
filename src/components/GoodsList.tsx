import React from 'react';
import { GoodCard } from './GoodCard';

type Props = {
  goods: string[];
};

export const GoodsList: React.FC<Props> = ({ goods }) => (
  <ul>
    {goods.map(good => (
      <GoodCard key={good} good={good} />
    ))}
  </ul>
);
