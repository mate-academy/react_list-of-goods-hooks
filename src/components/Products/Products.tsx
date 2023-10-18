import React from 'react';

interface Props {
  visibleGoods: string[]
}

export const Products: React.FC<Props> = ({ visibleGoods }) => (
  <ul>
    {visibleGoods.map((good) => (
      <li key={good} data-cy="Good">
        {good}
      </li>
    ))}
  </ul>
);
