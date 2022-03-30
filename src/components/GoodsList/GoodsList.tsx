import React from 'react';
import { Good } from '../../types/Good';

import './GoodsList.scss';

type Props = {
  goods: Good[],
};

export const GoodsList: React.FC<Props> = React.memo(
  ({ goods }) => (
    <ul className="Goods__list">
      {goods.map(good => (
        <li className="Goods__item" key={good.id}>
          {good.name}
        </li>
      ))}
    </ul>
  ),
);
