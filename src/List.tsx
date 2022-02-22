import React from 'react';

type Props = {
  goods: string[]
};

export const List: React.FC<Props> = React.memo(
  ({ goods }) => {
    return (
      <ul>
        {goods.map(good => (
          <li key={good}>{good}</li>
        ))}
      </ul>
    );
  },
);
