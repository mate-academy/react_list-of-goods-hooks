import React from 'react';

type Props = {
  goods: string[];
};

export const GoodsList: React.FC<Props> = ({ goods }) => {
  return (
    <ul>
      {goods.map(good => {
        return (
          <li data-cy="good" key={good}>
            {good}
          </li>
        );
      })}
    </ul>
  );
};
