import React from 'react';

interface Good {
  id: number;
  name: string;
}

type Props = {
  goods: Good[];
};

export const GoodsList: React.FC<Props> = ({ goods }) => (
  <ul>
    {goods.map(good => (
      <li data-cy="Good" key={good.id}>
        {good.name}
      </li>
    ))}
  </ul>
);
