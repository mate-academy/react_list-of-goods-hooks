import { FC } from 'react';
import { Good } from '../Good/Good';

type Props = {
  visibleGoods: string[],
};

export const GoodsList: FC<Props> = ({ visibleGoods }) => (
  <ul>
    {visibleGoods.map(good => (
      <Good good={good} key={good} />
    ))}
  </ul>
);
