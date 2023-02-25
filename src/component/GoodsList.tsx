import React from 'react';

type Props = {
  goodsList: string[],
};

export const GoodList: React.FC<Props> = ({ goodsList }) => {
  return (
    <ul>
      {goodsList.map(goodItem => (
        <li data-cy="Good" key={goodItem}>
          {goodItem}
        </li>
      ))}
    </ul>
  );
};
