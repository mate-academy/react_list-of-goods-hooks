import React from 'react';

type Props = {
  goods: Array<string>;
};

export const Goods: React.FC<Props> = ({ goods }) => (
  <ul>
    <ul>
      {goods.map((good: string) => (
        <li key={good} data-cy="Good">
          {good}
        </li>
      ))}
    </ul>
  </ul>
);
