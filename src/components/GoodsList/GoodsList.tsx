import React from 'react';

interface Props {
  goods: string[],
}

export const GoodsList: React.FC<Props> = ({ goods }) => (
  <ul className="goods__list">
    {goods.map(good => (
      <li key={good} className="goods__good">{good}</li>
    ))}
  </ul>
);
