import React from 'react';

 type Props = {
   goods: string[];
 };

export const GoodsList: React.FC<Props> = ({ goods }) => {
  return (
    <ul>
      {goods.map((good) => (
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
