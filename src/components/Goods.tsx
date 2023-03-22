import React from 'react';

interface Props {
  goods: string[];
}

export const Goods: React.FC<Props> = ({ goods }) => {
  return (
    <ul>
      {goods.map(good => (
        <li
          data-cy="Good"
          key={good}
        >
          {good}
        </li>
      ))}
    </ul>
  );
};
