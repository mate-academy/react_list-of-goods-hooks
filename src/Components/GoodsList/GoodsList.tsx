import { FC } from 'react';

type GoodsListProps = {
  goods: string[];
};

export const GoodsList: FC<GoodsListProps> = ({ goods }) => (
  <ul>
    {goods.map(good => (
      <li key={good} data-cy="Good">
        {good}
      </li>
    ))}
  </ul>
);
