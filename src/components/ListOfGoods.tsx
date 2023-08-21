import React from 'react';

type Props = {
  visibleGoods: string[];
};

export const ListOfGoods: React.FC<Props> = ({ visibleGoods }) => (
  <ul>
    {visibleGoods.map((index) => (
      <li data-cy="Good" key={index}>{index}</li>
    ))}
  </ul>
);
