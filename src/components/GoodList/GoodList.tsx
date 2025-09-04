import React from 'react';
import { Good } from '../Good/Good';
import { GoodType } from '../../types/GoodType';

interface Props {
  goods: GoodType[];
}

export const GoodList: React.FC<Props> = ({ goods }) => (
  <ul>
    {goods.map(good => (
      <Good key={good} good={good} />
    ))}
  </ul>
);
