import React from 'react';
import { Good } from '../../types/Good';

type Props = {
  goods: Good[],
};

export const ListOfGoods: React.FC<Props> = React.memo(
  ({ goods }) => (
    <ul>
      {goods.map(good => (
        <li
          key={good.id}
        >
          {good.name}
        </li>
      ))}
    </ul>
  ),
);
