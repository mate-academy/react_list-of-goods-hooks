import React from 'react';

type Props = {
  goods: string[];
};

export const List: React.FC<Props> = ({ goods }) => (
  <ul>
    {goods.map(item => (
      <li key={item} data-cy="Good">
        {item}
      </li>
    ))}
  </ul>
);
