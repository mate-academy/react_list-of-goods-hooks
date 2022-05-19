import React from 'react';

type Props = {
  goods: string[],
};

export const GoodsList: React.FC<Props> = ({ goods }) => (
  <ul>
    {goods.map((good) => (
      <li key={good}>
        {good}
      </li>
    ))}
  </ul>
);
