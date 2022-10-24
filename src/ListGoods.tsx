import React from 'react';

type Props = {
  reorderedGoods: string[];
};

export const ListGoods: React.FC<Props> = ({ reorderedGoods }) => (
  <ul>
    {reorderedGoods.map(good => (
      <li data-cy="Good" key={good}>
        {good}
      </li>
    ))}
  </ul>
);
