import React from 'react';
import { GoodInfo } from '../GoodInfo/GoodInfo';
import { Good } from '../../types/Good';

type Props = {
  goods: Good[];
};

export const GoodList: React.FC<Props> = ({ goods }) => (
  <ul className="GoodList">
    {goods.map(good => <GoodInfo key={good} good={good} />)}
  </ul>
);
