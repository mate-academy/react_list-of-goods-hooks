import { FC } from 'react';
import { SortType } from '../../types/SortType';
import { getReorderedGoods } from '../../utils/getReorderedGoods';

type Props = {
  goods: string[],
  sortType: SortType,
  isReversed: boolean,
};

export const GoodsList: FC<Props> = ({ goods, sortType, isReversed }) => {
  const renderedGoods = getReorderedGoods(goods, sortType, isReversed);

  return (
    <ul>
      {renderedGoods.map(good => (
        <li key={good} data-cy="Good">{good}</li>
      ))}
    </ul>
  );
};
