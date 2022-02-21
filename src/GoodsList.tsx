import React from 'react';

type Props = {
  goods: string[];
};

export const GoodsList:React.FC<Props> = ({ goods }) => (
  <>
    <ul>
      {goods.map((good: string) => (
        <li key={good}>
          {good}
        </li>
      ))}
    </ul>
  </>
);
