import cn from 'classnames';
import 'bulma/css/bulma.css';
import './App.scss';
import React, { useState } from 'react';
import { GoodList } from './Components/GoodList';

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
  SORT_BY_ALPHABET = 'name',
  SORT_BY_LENGTH = 'length',
  none = '',
}

enum SortResult {
  SORTED_BY_ALPHABET = 'Sorted by alphabetical order',
  SORTED_BY_LENGTH = 'Sorted by length',
  NOT_SORTED = 'Not sorted',
}

function updateCurrentGoods(
  goods: string[],
  sortType: string,
  isReversed: boolean,
) {
  let visibleGoods = [...goods];

  const sortedGoods = visibleGoods.sort((good1, good2) => {
    switch (sortType) {
      case SortType.SORT_BY_ALPHABET:
        return good1.localeCompare(good2);
      case SortType.SORT_BY_LENGTH:
        return good1.length - good2.length;
      default:
        return 0;
    }
  });

  if (isReversed) {
    visibleGoods = visibleGoods.reverse();
  }

  return isReversed ? visibleGoods : sortedGoods;
}

function createSortText(sortType: string, isReversed: boolean) {
  let result: string;

  switch (sortType) {
    case SortType.SORT_BY_ALPHABET:
      result = SortResult.SORTED_BY_ALPHABET;
      break;
    case SortType.SORT_BY_LENGTH:
      result = SortResult.SORTED_BY_LENGTH;
      break;
    default:
      result = SortResult.NOT_SORTED;
      break;
  }

  if (isReversed) {
    result += ' and the list is reversed';
  }

  return result;
}

export const App: React.FC = () => {
  const [sortType, setSortType] = useState(SortType.none);
  const [isReversed, setIsReversed] = useState(false);

  const currentGoods = updateCurrentGoods(
    goodsFromServer,
    sortType,
    isReversed,
  );

  const reset = () => {
    setSortType(SortType.none);
    setIsReversed(false);
  };

  const isReset = sortType || isReversed;

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button is-info', {
            'is-light': sortType !== SortType.SORT_BY_ALPHABET,
          })}
          onClick={() => {
            setSortType(SortType.SORT_BY_ALPHABET);
          }}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button is-success', {
            'is-light': sortType !== SortType.SORT_BY_LENGTH,
          })}
          onClick={() => {
            setSortType(SortType.SORT_BY_LENGTH);
          }}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button is-warning', { 'is-light': !isReversed })}
          onClick={() => {
            setIsReversed(!isReversed);
          }}
        >
          Reverse
        </button>

        {isReset && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={reset}
          >
            Reset
          </button>
        )}
      </div>

      <GoodList goods={currentGoods} />

      <h1>{createSortText(sortType, isReversed)}</h1>
    </div>
  );
};
