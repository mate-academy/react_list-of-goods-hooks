import React from 'react';

type GoodsListProps = {
  visibleGoods: string[],
};

export const GoodsList: React.FC<GoodsListProps> = ({ visibleGoods }) => (
  <ul>
    {visibleGoods.map(good => (
      <li data-cy="Good" key={good}>{good}</li>
    ))}
  </ul>
);
