import React from 'react';

export type Props = {
  visibleGoods: string[],
};

export const GoodList: React.FC<Props> = ({ visibleGoods }) => {
  return (
    <ul>
      {visibleGoods.map(good => (
        <li key={good} data-cy="Good">
          {good}
        </li>
      ))}
    </ul>
  );
};
