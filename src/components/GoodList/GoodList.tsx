import React from 'react';
import { GoodCard } from '../GoodCart/GoodCart';

export const GoodList: React.FC<{ goods: string[] }> = ({ goods }) => (
  <ul>
    {goods.map(good => (
      <GoodCard good={good} key={good} />
    ))}
  </ul>
);
