import React from 'react';
import GoodGard from '../GoodCard/GoodCard';

type Props = {
  goods: string[];
};

export const GoodList: React.FC<Props> = ({ goods }) => (
  <ul>
    {goods.map(good => (
      <GoodGard good={good} key={good} />
    ))}
  </ul>
);
