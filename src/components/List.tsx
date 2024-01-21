import React from 'react';
import { ListProps } from '../types';

export const List: React.FC<ListProps> = ({ visibleGoods }) => {
  return (
    <ul>
      {visibleGoods.map(item => (
        <li key={item} data-cy="Good">
          {item}
        </li>
      ))}
    </ul>
  );
};
