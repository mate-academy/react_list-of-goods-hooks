import { FC } from 'react';
import { createId } from '../../utils/uuid-creator';

interface GoodsProps {
  goods: string[];
}

export const Goods: FC<GoodsProps> = ({ goods }) => (
  <ul>
    {goods.map(good => (
      <li key={createId()} data-cy="Good">
        {good}
      </li>
    ))}
  </ul>
);
