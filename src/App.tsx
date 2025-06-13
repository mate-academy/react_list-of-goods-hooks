import React, { useState } from 'react';
import cn from 'classnames';
import 'bulma/css/bulma.css';
import './App.scss';
import { ListOfGoods } from './Components/listOfGoods';

export const goodsFromServer = [
  'Dumplings',
  'Carrot',
  'Eggs',
  'Ice cream',
  'Apple',
  'Bread',
  'Fish',
  'Honey',
  'Jam',
  'Garlic',
];

enum SortType {
  SORT_ALPHABETICALY = 'sortAlphabetically',
  SORT_BY_LENGTH = 'sortByLength',
  UNSORTED = '',
}

interface FilterParams {
  sortField: SortType;
  isReversed: boolean;
}

function getPreparedGoods(
  goods: string[],
  { sortField, isReversed }: FilterParams,
): string[] {
  const prepGoods = [...goods];

  if (sortField) {
    prepGoods.sort((a, b) => {
      switch (sortField) {
        case SortType.SORT_ALPHABETICALY:
          return a.localeCompare(b);
        case SortType.SORT_BY_LENGTH:
          return a.length - b.length;
        default:
          return 0;
      }
    });
  }

  if (isReversed) {
    return prepGoods.reverse();
  }

  return prepGoods;
}

export const App: React.FC = () => {
  const [sortField, setSortField] = useState<SortType>(SortType.UNSORTED);
  const [isReversed, setIsReversed] = useState<boolean>(false);

  const prepareGoods = getPreparedGoods(goodsFromServer, {
    sortField,
    isReversed,
  });
  const resetGoods = () => {
    setSortField(SortType.UNSORTED);
    setIsReversed(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => setSortField(SortType.SORT_ALPHABETICALY)}
          type="button"
          className={cn('button', 'is-info', {
            'is-light': sortField !== SortType.SORT_ALPHABETICALY,
          })}
        >
          Sort alphabetically
        </button>

        <button
          onClick={() => setSortField(SortType.SORT_BY_LENGTH)}
          type="button"
          className={cn('button', 'is-info', {
            'is-light': sortField !== SortType.SORT_BY_LENGTH,
          })}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button', 'is-warning', {
            'is-light': !isReversed,
          })}
          onClick={() => setIsReversed(!isReversed)}
        >
          Reverse
        </button>

        {(sortField || isReversed) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => resetGoods()}
          >
            Reset
          </button>
        )}
      </div>
      <ListOfGoods goods={prepareGoods} />
    </div>
  );
};
