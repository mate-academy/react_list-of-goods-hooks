import React from 'react';

import { Good } from '../../types/Good';
import { GoodInfo } from '../GoodInfo/GoodInfo';

type Props = {
  goods: Good[];
};

export const GoodList: React.FC<Props> = ({ goods }) => {
  return (
    <ul>
      {goods.map(good => (
        <li key={good} data-cy="Good">
          <GoodInfo good={good} />
        </li>
      ))}
    </ul>
  );
};
