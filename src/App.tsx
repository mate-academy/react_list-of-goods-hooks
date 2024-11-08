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

type Good = string;

enum SortType {
  none,
  alphabet,
  length,
}
export const App: React.FC = () => {
  const [sortField, setSortField] = useState(SortType.none);
  const [reverse, setReverse] = useState(false);

  const sortFunc = (good1: Good, good2: Good) => {
    const reverseRatio = reverse ? -1 : 1;

    switch (sortField) {
      case SortType.alphabet: {
        return reverseRatio * good1.localeCompare(good2);
      }

      case SortType.length: {
        const initialSort = good1.length - good2.length;
        const sortByLengthAndSortEquals =
          initialSort === 0 ? good1.localeCompare(good2) : initialSort;

        return reverseRatio * sortByLengthAndSortEquals;
      }

      case SortType.none: {
        return reverseRatio;
      }

      default: {
        return 0;
      }
    }
  };

  const getVisibleGoods = () => {
    const visibleGoods: Good[] = [...goodsFromServer];

    visibleGoods.sort(sortFunc);

    return visibleGoods;
  };

  const handleReset = () => {
    setSortField(SortType.none);
    setReverse(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button', 'is-info', {
            'is-light': sortField !== SortType.alphabet,
          })}
          onClick={() => setSortField(SortType.alphabet)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button', 'is-success', {
            'is-light': sortField !== SortType.length,
          })}
          onClick={() => setSortField(SortType.length)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button', 'is-warning', {
            'is-light': !reverse,
          })}
          onClick={() => setReverse(!reverse)}
        >
          Reverse
        </button>

        {sortField === SortType.none && !reverse ? (
          ''
        ) : (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => handleReset()}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        <ul>
          {getVisibleGoods().map(good => (
            <li data-cy="Good" key={good}>
              {good}
            </li>
          ))}
        </ul>
      </ul>
    </div>
  );
};
