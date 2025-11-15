import React from 'react';

interface GoodsListProps {
  goods: string[];
}

export const GoodsList: React.FC<GoodsListProps> = ({ goods }) => (
  <ul>
    {goods.map((good, index) => (
      <li key={`${good}-${index}`} data-cy="Good">
        {good}
      </li>
    ))}
  </ul>
);
