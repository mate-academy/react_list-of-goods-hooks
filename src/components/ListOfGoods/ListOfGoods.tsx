import React from 'react';

type Props = {
  goods: string[];
};

export const ListOfGoods: React.FC<Props> = ({ goods }) => {
  return (
    <ul>
      {goods.map(good => (
        <li data-cy="Good" key={good}>{good}</li>
      ))}
    </ul>
  );
};
