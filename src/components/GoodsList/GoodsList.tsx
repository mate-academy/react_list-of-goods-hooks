import React from 'react';

import './GoodsList.scss';

type Props = {
  goods: string[],
};

export const GoodsList: React.FC<Props> = React.memo(
  ({ goods }) => (
    <ul className="Goods__list">
      {goods.map(good => (
        <li className="Goods__item" key={good}>
          {good}
        </li>
      ))}
    </ul>
  ),
);
