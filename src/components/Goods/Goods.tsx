import React from 'react';

type Props = {
  goods: string[];
};
export const Goods: React.FC<Props> = ({ goods }) => (
  <ul>
    <ul>
      {goods.map(good => (
        <li key={good} data-cy="Good">
          {good}
        </li>
      ))}
    </ul>
  </ul>
);
