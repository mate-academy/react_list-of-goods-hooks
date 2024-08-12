import React from 'react';
import { Good } from '../../types/Good';

type Props = {
  goods: Good[];
};

export const GoodList: React.FC<Props> = ({ goods }) => (
  <ul>
    {goods.map(good => (
      <li data-cy="Good" key={good}>
        {good}
      </li>
    ))}
  </ul>
);
