import React from 'react';
import { Good } from '../Good/Good';

type Props = {
  goods: string[];
};

export const GoodList: React.FC<Props> = ({ goods }) => {
  return (
    <ul>
      {goods.map(good => (
        <Good good={good} key={good} />
      ))}
    </ul>
  );
};
