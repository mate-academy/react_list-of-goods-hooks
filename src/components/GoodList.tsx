import React from 'react';
import { Good } from './Good';

type Props = {
  goods: string[];
};

export const GoodList: React.FC<Props> = ({ goods }) => (
  <ul>
    {
      goods.map(good => <Good key={good} good={good} />)
    }
  </ul>
);
