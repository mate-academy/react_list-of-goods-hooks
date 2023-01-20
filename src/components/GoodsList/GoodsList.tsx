import { FC } from 'react';
import { SortType } from '../../types/SortType';

type Props = {
  goods: string[],
  sortType: SortType,
  isReversed: boolean,
};

export const GoodsList: FC<Props> = ({ goods, sortType, isReversed }) => {
  const renderedGoods = [...goods];

  if (sortType) {
    renderedGoods.sort((a, b) => {
      switch (sortType) {
        case SortType.LENGTH:
          return (a.length - b.length);

        case SortType.ALPHABET:
          return a.localeCompare(b);

        default:
          throw new Error('Invalid SortType');
      }
    });
  }

  if (isReversed) {
    renderedGoods.reverse();
  }

  return (
    <ul>
      {renderedGoods.map(good => (
        <li key={good} data-cy="Good">{good}</li>
      ))}
    </ul>
  );
};
