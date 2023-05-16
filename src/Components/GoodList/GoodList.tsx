import React from 'react';

type Props = {
  goods: Array<string>;
};

export const GoodList: React.FC<Props> = ({ goods }) => (
  <ul>
    {goods.map(good => (
      <li key={good}>
        {good}
      </li>
    ))}
  </ul>
);
