import React from 'react';

type Good = string;

const GoodList: React.FC<{ goods: Good[] }> = ({ goods }) => (
  <ul>
    {goods.map(good => (
      <li key={good} data-cy="Good">
        {good}
      </li>
    ))}
  </ul>
);

export { GoodList };
