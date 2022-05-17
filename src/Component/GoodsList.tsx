import React from 'react';

type Props = {
  goods: string[]
};

export const GoodsList: React.FC<Props> = ({ goods }) => (
  <ul className="List">
    {goods.map(good => (
      <li className="List__item" key={good}>
        {good}
      </li>
    ))}
  </ul>
);
