import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
import cn from 'classnames';

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
  Alphabetically,
  ByLength,
}

function getPreparedGoods(
  goods: string[],
  { sortField, reverse }: { sortField: SortType; reverse: boolean },
): string[] {
  const preparedGoods = [...goods];

  preparedGoods.sort((good1, good2) => {
    switch (sortField) {
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
  const [sortField, setSortField] = useState(SortType.Default);
  const [reverse, setReverse] = useState(false);
  const goodsList = getPreparedGoods(goodsFromServer, { sortField, reverse });
  const isChanged = sortField !== SortType.Default || reverse;

  function handleReset() {
    setSortField(SortType.Default);
    setReverse(false);
  }

  function handleSortByName() {
    setSortField(SortType.Alphabetically);
  }

  function handleSortByLength() {
    setSortField(SortType.ByLength);
  }

  function handleReverse() {
    setReverse(prev => !prev);
  }

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button is-info', {
            'is-light': sortField !== SortType.Alphabetically,
          })}
          onClick={() => {
            if (sortField !== SortType.Alphabetically) {
              handleSortByName();
            }
          }}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button is-success', {
            'is-light': sortField !== SortType.ByLength,
          })}
          onClick={() => {
            if (sortField !== SortType.ByLength) {
              handleSortByLength();
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
          onClick={handleReverse}
        >
          Reverse
        </button>

        {isChanged && (
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
        {goodsList.map(good => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
