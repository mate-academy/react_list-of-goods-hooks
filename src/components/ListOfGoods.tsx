import React from 'react';

type Props = {
  visibleGoods: string[],
};

export const ListOfGoods: React.FC<Props> = ({ visibleGoods }) => (
  <ul>
    {visibleGoods.map((item) => (
      <li data-cy="Good" key={item}>
        {item}
      </li>
    ))}
  </ul>
);
