import React from 'react';

interface GoodsListProps {
  goods: string[];
}

export const GoodsList: React.FC<GoodsListProps> = ({ goods }) => (
  <ul>
    {goods.map(good => (
      <li key={good} data-cy="Good">
        {good}
      </li>
    ))}
  </ul>
);
