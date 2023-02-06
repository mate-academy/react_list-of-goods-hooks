import React from 'react';
import { SortType } from '../../types/SortType';

type Props = {
  goods: string[],
  sortType: SortType,
  isReversed: boolean,
};

export const GoodsList: React.FC<Props> = ({ goods, sortType, isReversed }) => {
  const visibleGoods = [...goods];

  visibleGoods.sort((a, b) => {
    switch (sortType) {
      case SortType.ALPHABET:
        return a.localeCompare(b);

      case SortType.LENGTH:
        return a.length - b.length;

      case SortType.NONE:
        return 0;

      default:
        throw new Error('Invalid sort type');
    }
  });

  if (isReversed) {
    visibleGoods.reverse();
  }

  return (
    <ul>
      <>
        {visibleGoods.map((good) => (
          <li
            data-cy="Good"
            key={good}
          >
            {good}
          </li>
        ))}
      </>
    </ul>
  );
};
