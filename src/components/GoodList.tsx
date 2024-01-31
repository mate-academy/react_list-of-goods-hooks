import React from 'react';
import { GoodCard } from './GoodCard';

type Props = {
  goods: string[];
};

export const GoodList: React.FC<Props> = ({ goods }) => (
  <ul className="good-list">
    {goods.map((good) => (
      <GoodCard key={good} good={good} />
    ))}
  </ul>
);
