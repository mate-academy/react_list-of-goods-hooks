import React from 'react';
import { Good } from '../Good/Good';

export interface IGood {
  good: string;
}

export type TGood = {
  good: IGood;
};

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
