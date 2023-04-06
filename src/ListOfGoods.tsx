import React from 'react';

type Props = {
  goods: string[];
};

export const ListOfGoods: React.FC<Props> = ({ goods }) => (
  <ul>
    {goods.map(item => (
      <li data-cy="Good" key={item}>
        {item}
      </li>
    ))}
  </ul>
);
