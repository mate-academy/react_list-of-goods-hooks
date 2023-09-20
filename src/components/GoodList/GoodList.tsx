import React from 'react';
import { Good } from '../../types/Good';
import { GoodCard } from '../GoodCard/GoodCard';

type Props = {
  goods: Good[];
};

export const GoodList: React.FC<Props> = ({ goods }) => (
  <ul className="GoodList">
    {goods.map((good) => (
      <GoodCard
        key={good.id}
        good={good}
      />
    ))}
  </ul>
);
