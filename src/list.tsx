import React from 'react';

type Props = {
  goods: string[];
};

export const ListOfGoods: React.FC<Props> = React.memo(
  ({ goods }) => (
    <ul>
      {goods.map((good) => (
        <li
          key={good}
          data-cy="Good"
        >
          {good}
        </li>
      ))}
    </ul>
  ),
);
