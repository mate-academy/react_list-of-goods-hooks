import React from 'react';

type Props = {
  goods: string[];
};

export const GoodsList: React.FC<Props> = React.memo(({ goods }) => {
  return (
    <ul>
      {goods.map(good => (
        <li data-cy="Good" key={good}>{good}</li>
      ))}
    </ul>
  );
});
