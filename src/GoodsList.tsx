import React from 'react';
import { Good } from './Good';

type Props = {
  goods: string[];
};

export const GoodList: React.FC<Props> = ({ goods }) => (
  <>
    {goods.map((good) => (
      <Good good={good} key={good} />
    ))}
  </>
);
