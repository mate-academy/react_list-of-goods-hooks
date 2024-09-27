import React, { useState } from 'react';
import cn from 'classnames';
import 'bulma/css/bulma.css';
import './App.scss';

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
  all = 'all',
  byAlphabet = 'alphabet',
  byLength = 'length',
}

type SortParams = {
  sortType: SortType;
  isReversed: boolean;
};

const sortList = (
  items: string[],
  { sortType, isReversed }: SortParams,
): string[] => {
  const newItems = [...items];

  switch (sortType) {
    case SortType.byAlphabet:
      newItems.sort((a, b) => a.localeCompare(b));
      break;
    case SortType.byLength:
      newItems.sort((a, b) => a.length - b.length);
      break;
    default:
      break;
  }

  if (isReversed) {
    newItems.reverse();
  }

  return newItems;
};

export const App: React.FC = () => {
  const [sortType, setSortType] = useState<SortType>(SortType.all);
  const [isReversed, setIsReversed] = useState<boolean>(false);
  const sortedGoods = sortList(goodsFromServer, { sortType, isReversed });
  const isResettable = sortType !== SortType.all || isReversed;

  const handleSort = (newSortType: SortType) => {
    setSortType(newSortType);
  };

  const handleReverse = () => {
    setIsReversed(!isReversed);
  };

  const handleReset = () => {
    setSortType(SortType.all);
    setIsReversed(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button is-info', {
            'is-light': sortType !== SortType.byAlphabet,
          })}
          onClick={() => {
            handleSort(SortType.byAlphabet);
          }}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button is-success', {
            'is-light': sortType !== SortType.byLength,
          })}
          onClick={() => {
            handleSort(SortType.byLength);
          }}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button is-warning', {
            'is-light': !isReversed,
          })}
          onClick={handleReverse}
        >
          Reverse
        </button>

        {isResettable && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={handleReset}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {sortedGoods.map(good => (
          <li data-cy="Good" key={good}>
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
