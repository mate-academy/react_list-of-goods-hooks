import React from 'react';

import { Good } from '../../types/Good';

type Props = {
  goods: Good[];
};

export const GoodList: React.FC<Props> = ({ goods }) => {
  return (
    <ul>
      {goods.map(good => (
        <li key={good} data-cy="Good">
          {good}
        </li>
      ))}
    </ul>
  );
};
