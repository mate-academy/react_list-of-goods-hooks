import React from 'react';

export const Goods: React.FC<{ visibleGoods: string[] }> = ({
  visibleGoods,
}) => (
  <ul>
    {visibleGoods.map((good: string) => (
      <li data-cy="Good" key={good}>
        {good}
      </li>
    ))}
  </ul>
);
