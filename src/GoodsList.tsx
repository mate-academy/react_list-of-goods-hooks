import { FC } from 'react';

type GoodsListType = {
  list: Array<string>;
};

export const GoodsList: FC<GoodsListType> = ({ list }) => (
  <ul>
    {list.map(el => (
      <li key={el} data-cy="Good">
        {el}
      </li>
    ))}
  </ul>
);
