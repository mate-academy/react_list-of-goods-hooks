import React from 'react';

type Props = {
  actualOrder: string[]
};

export const GoodsList: React.FC<Props> = ({ actualOrder }) => {
  return (
    <ul>
      {actualOrder.map(good => (
        <li key={good}>
          {good}
        </li>
      ))}
    </ul>
  );
};
