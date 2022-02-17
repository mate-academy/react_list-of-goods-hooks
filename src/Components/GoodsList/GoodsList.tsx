import React from 'react';

export type Props = {
  goods: string[];
};

export const GoodsList: React.FC<Props> = ({ goods }) => {
  return (
    <ul>
      {goods.map((good: string) => (
        <li key={good}>
          {good}
        </li>
      ))}
    </ul>
  );
};
