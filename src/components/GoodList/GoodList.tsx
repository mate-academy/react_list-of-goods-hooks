import React from 'react';
import { GoodItem } from '../GoodItem';

type Props = {
  goods: string[];
};

export const GoodList: React.FC<Props> = ({ goods }) => {
  return (
    <ul>
      {goods.map(good => (
        <GoodItem key={good} good={good} />
      ))}
    </ul>
  );
};
