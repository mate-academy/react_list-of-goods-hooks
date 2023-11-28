import React from 'react';
import { GoodInfo } from '../GoodInfo';

type Props = {
  goods: string[];
};

export const GoodList: React.FC<Props> = ({ goods }) => (
  <>
    <ul>
      {goods?.map(good => (
        <GoodInfo good={good} />
      ))}
    </ul>
  </>
);
