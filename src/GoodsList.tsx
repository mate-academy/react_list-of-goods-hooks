import React from 'react';
import { Good } from './Good';

type Props = {
  goods: string[];
};

export const GoodsList: React.FC<Props> = ({ goods }) => (
  <ul>
    {goods.map((good: string) => (
      <Good good={good} key={good} />
    ))}
  </ul>
);
