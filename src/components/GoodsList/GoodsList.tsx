import React from 'react';
import { Good } from '../../types/Good';
import { GoodInfo } from '../GoodInfo';

type Props = {
  goods: Good[];
};

export const GoodsList: React.FC<Props> = ({ goods }) => (
  <ul>
    {goods.map(good => <GoodInfo good={good} />)}
  </ul>
);
