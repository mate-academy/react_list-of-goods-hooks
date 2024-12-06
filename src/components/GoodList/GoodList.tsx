import { GoodCard } from '../GoodCard';
import React from 'react';

type Props = {
  goods: string[];
};

export const GoodList: React.FC<Props> = ({ goods }) => (
  <ul className="GoodList">
    {goods.map((good: string) => (
      <GoodCard good={good} key={good} />
    ))}
  </ul>
);
