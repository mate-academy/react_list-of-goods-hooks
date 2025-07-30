import React from 'react';
import { Good } from '../Good/Good';
import { TGood } from '../../types/TGood';

type Props = {
  goods: TGood[];
};

export const GoodList: React.FC<Props> = ({ goods }) => {
  return (
    <ul>
      {goods.map((good: TGood, index: number) => {
        return <Good good={good} key={index} />;
      })}
    </ul>
  );
};
