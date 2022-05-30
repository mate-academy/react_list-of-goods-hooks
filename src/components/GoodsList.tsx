import React from 'react';

interface Props {
  copyGoods: string[];
}

export const GoodsList: React.FC<Props> = ({ copyGoods }) => (
  <ul className="GoodsList">
    {copyGoods.map(good => (
      <li className="GoodsList__item" key={good}>
        {good}
      </li>
    ))}
  </ul>
);
