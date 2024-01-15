import React from 'react';
import { GoodsInfo } from '../GoodInfo';
import { Good } from '../../types/Good';

type Props = {
  goods: Good[],
};

export const GoodsList: React.FC<Props> = ({ goods }) => {
  return (
    <ul>
      {goods.map(good => (
        <GoodsInfo good={good} />
      ))}
    </ul>
  );
};
