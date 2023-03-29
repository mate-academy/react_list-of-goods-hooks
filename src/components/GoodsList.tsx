import React from 'react';

type Props = {
  orderingGoods: string[],
};

export const GoodsList: React.FC<Props> = ({ orderingGoods }) => (
  <ul>
    {orderingGoods.map(word => (
      <li
        data-cy="Good"
        key={word}
      >
        {word}
      </li>
    ))}
  </ul>
);
