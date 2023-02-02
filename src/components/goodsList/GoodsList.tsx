import React from 'react';
import 'bulma/css/bulma.css';
import { SortType } from '../../types/sortTypes';

type Props = {
  goods: string[];
  sortType: SortType;
  isReversed: boolean;
};

const getReorderedGoods = (
  goods: string[],
  sortType: SortType,
  isReversed: boolean,
) => {
  const reorderedGoods = [...goods];

  reorderedGoods.sort((good1, good2) => {
    switch (sortType) {
      case SortType.ALPHABET:
        return good1.localeCompare(good2);
      case SortType.LENGTH:
        return good1.length - good2.length;
      case SortType.NONE:
        return 0;
      default:
        return 0;
    }
  });

  if (isReversed) {
    reorderedGoods.reverse();
  }

  return reorderedGoods;
};

export const GoodsList: React.FC<Props> = (props: Props) => {
  const { goods, sortType, isReversed } = props;

  const visibleGoods = getReorderedGoods(goods, sortType, isReversed);

  return (
    <ul>
      {visibleGoods.map(good => (
        <li data-cy="Good" key={good}>
          {good}
        </li>
      ))}
    </ul>
  );
};
