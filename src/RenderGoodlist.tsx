import React from 'react';
import { Good } from './types';

interface GoodsListProps {
  goods: Good[];
}

export const RenderGoodlist: React.FC<GoodsListProps> = ({ goods }) => (
  <ul>
    {goods.map(good => (
      <li key={good.id} data-cy="Good">
        {good.name}
      </li>
    ))}
  </ul>
);
