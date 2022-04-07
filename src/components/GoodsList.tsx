import React from 'react';

type Props = {
  visibleGoods: string[];
};

export const GoodsList: React.FC<Props> = ({ visibleGoods }) => {
  return (
    <ul>
      {visibleGoods.map(good => (
        <li key={good}>{good}</li>
      ))}
    </ul>
  );
};
