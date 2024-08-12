import React from 'react';
import { Good } from '../../types/Good';
import { GoodItem } from '../Good';

type Props = {
  goods: Good[];
};

export const GoodList: React.FC<Props> = ({ goods }) => (
  <ul>
    {goods.map(good => (
      <GoodItem good={good} key={good} />
    ))}
  </ul>
);
