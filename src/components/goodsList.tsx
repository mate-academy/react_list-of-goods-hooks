import React from 'react';

type Props = {
  goodies: string[];
};

export const GoodsList: React.FC<Props> = ({ goodies }) => {
  return (
    <ul>
      {goodies.map((good) => (
        <li
          key={good}
          data-cy="Good"
        >
          {good}
        </li>
      ))}
    </ul>
  );
};
