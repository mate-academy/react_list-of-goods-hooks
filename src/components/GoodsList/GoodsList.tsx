import React from 'react';

type Props = {
  reorderdGoods: string[],
};

export const GoodsList: React.FC<Props> = ({ reorderdGoods }) => (
  <ul>
    {reorderdGoods.map(good => (
      <li data-cy="Good" key={good}>
        {good}
      </li>
    ))}
  </ul>
);
