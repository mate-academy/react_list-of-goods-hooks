import React from 'react';

type Props = {
  goods: string[];
};

export const GoodsList: React.FC<Props> = ({ goods }) => {
  return (
    <ul>
      {goods.map(product => (
        <li
          data-cy="Good"
          key={product}
        >
          {product}
        </li>
      ))}
    </ul>
  );
};
