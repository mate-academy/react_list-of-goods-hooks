import React from 'react';

type Proops = {
  goods: string[];
};

export const GoodList: React.FC<Proops> = ({ goods }) => {
  return (
    <ul>
      {goods.map(good => (
        <li key={good} data-cy="Good">
          {good}
        </li>
      ))}
    </ul>
  );
};
