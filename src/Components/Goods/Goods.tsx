import React from 'react';

type Props = {
  goods: Array<string>;
};

export const Goods: React.FC<Props> = ({ goods }) => (
  <ul>
    <ul>
      {goods.map((good: string, index: number) => (
        <li key={index} data-cy="Good">
          {good}
        </li>
      ))}
    </ul>
  </ul>
);
