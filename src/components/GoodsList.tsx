import React from 'react';

type Props = {
  goods: string[],
};

export const GoodsList: React.FC<Props> = ({ goods }) => (
  <ul>
    {goods.map((goodItem) => (
      <li
        data-cy="Good"
        key={goodItem}
      >
        {goodItem}
      </li>
    ))}
  </ul>
);
