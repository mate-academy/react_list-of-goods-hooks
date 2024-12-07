import React from 'react';
import { VisibleGoodsProps } from '../types/VisibleGoodsProps';

export const VisibleGoods: React.FC<VisibleGoodsProps> = ({ visibleGoods }) => {
  return (
    <ul>
      {visibleGoods.map((good: string) => (
        <li key={good} data-cy="Good">
          {good}
        </li>
      ))}
    </ul>
  );
};
