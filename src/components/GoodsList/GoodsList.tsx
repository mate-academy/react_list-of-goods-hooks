import React from 'react';
import { Good } from '../../types/Good';

interface Props {
  goods: Good[];
}

export const GoodList: React.FC<Props> = ({ goods }) => {
  return (
    <ul>
      {goods.map(good => (
        <li data-cy="Good" key={good}>
          {good}
        </li>
      ))}
    </ul>
  );
};
