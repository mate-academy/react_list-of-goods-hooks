import React from 'react';
import { Good } from '../Good/Good';

interface Props {
  goods: string[];
}

export const GoodList: React.FC<Props> = ({ goods }) => (
  <ul>
    {goods.map((good: string) => (
      <Good good={good} key={good} data-cy="Good" />
    ))}
  </ul>
);
