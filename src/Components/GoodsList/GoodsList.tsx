import React from 'react';
import { goodsFromServer } from '../../data/goodsFromServer';
import { SortType } from '../../types/SortType';
import { getReorderedGoods } from '../../utils/getReorderedGoods';

type Props = {
  isReversed: boolean;
  sortType: SortType;
};

export const GoodsList: React.FC<Props> = ({ isReversed, sortType }) => {
  const goodsList = getReorderedGoods(goodsFromServer, isReversed, sortType);

  return (
    <ul>
      <ul>
        {goodsList.map(goodsItem => (
          <li data-cy="Good" key={goodsItem}>{goodsItem}</li>
        ))}
      </ul>
    </ul>
  );
};
