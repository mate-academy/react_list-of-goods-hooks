import { Good as GoodEl } from '../Good/Good';
import { Good as GoodInterface } from '../types/Good';
import React from 'react';

interface Props {
  goods: GoodInterface[];
}

export const Goods: React.FC<Props> = ({ goods }) => {
  return (
    <ul>
      {goods.map(good => (
        <GoodEl key={good.id} good={good} />
      ))}
    </ul>
  );
};
