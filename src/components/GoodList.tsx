import React from 'react';
import { GoodItem } from './GoodItem';

interface Props {
  goods: string[];
}

export const GoodList: React.FC<Props> = ({ goods }) => (
  <ul>
    {goods.map((good, index) => (
      <GoodItem good={good} key={index + 1} />
    ))}
  </ul>
);
