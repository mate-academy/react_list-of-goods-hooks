import React from 'react';
import { Good } from './Good';

type Props = {
  goods: string[],
};

export const GoodsList: React.FC<Props> = ({ goods }) => {
  return (
    <ul>
      {goods.map((good) => {
        return <Good key={good} good={good} />;
      })}
    </ul>
  );
};
