import React from 'react';

type Props = {
  goods: string[];
};

export const GoodsList: React.FC<Props> = ({ goods }) => {
  return (
    <ul data-cy="goods">
      {goods.map((good, index) => (
        <li key={`${good}-${index}`} data-cy="Good">
          {good}
        </li>
      ))}
    </ul>
  );
};
