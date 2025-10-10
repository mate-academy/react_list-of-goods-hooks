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
  Default,
  Alphabetically = 'Alphabetically',
  ByLength = 'ByLength',
}

function getPreparedGoods(
  goods: string[],
  { sortType: sortType, reverse }: { sortType: SortType; reverse: boolean },
): string[] {
  const preparedGoods = [...goods];

  preparedGoods.sort((good1, good2) => {
    switch (sortType) {
      case SortType.Alphabetically:
        return good1.localeCompare(good2);

      case SortType.ByLength:
        return good1.length - good2.length;

      case SortType.Default:
        return 0;
    }
  });

  if (reverse) {
    return preparedGoods.reverse();
  }

  return preparedGoods;
}

export const App: React.FC = () => {
  const [sortType, setSortType] = useState(SortType.Default);
  const [reverse, setReverse] = useState(false);
  const goodsList = getPreparedGoods(goodsFromServer, {
    sortType: sortType,
    reverse,
  });
  const isChanged = sortType !== SortType.Default || reverse;

  function resetSort() {
    setSortType(SortType.Default);
    setReverse(false);
  }

  function sortByName() {
    setSortType(SortType.Alphabetically);
  }

  function sortByLength() {
    setSortType(SortType.ByLength);
  }

  function toggleReverse() {
    setReverse(prev => !prev);
  }

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button is-info', {
            'is-light': sortType !== SortType.Alphabetically,
          })}
          onClick={() => {
            if (sortType !== SortType.Alphabetically) {
              sortByName();
            }
          }}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button is-success', {
            'is-light': sortType !== SortType.ByLength,
          })}
          onClick={() => {
            if (sortType !== SortType.ByLength) {
              sortByLength();
            }
          }}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button is-warning', {
            'is-light': !reverse,
          })}
          onClick={toggleReverse}
        >
          Reverse
        </button>

        {isChanged && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={resetSort}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {goodsList.map(good => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
