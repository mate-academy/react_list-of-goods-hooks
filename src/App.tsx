import React from 'react';
import { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
import classNames from 'classnames';

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

enum SortField {
  SORT_ALPHABETICALLY = 'Sort alphabetically',
  SORT_BY_LENGTH = 'Sort by length',
}

interface SortParams {
  sortField: string;
  isReversed: boolean;
}

function getSortedGoods(
  visibleGoods: string[],
  { sortField, isReversed }: SortParams,
) {
  const sortedGoods = [...visibleGoods].sort((good1, good2) => {
    switch (sortField) {
      case SortField.SORT_ALPHABETICALLY:
        return good1.localeCompare(good2);
      case SortField.SORT_BY_LENGTH:
        return good1.length - good2.length;
      default:
        return 0;
    }
  });

  if (isReversed) {
    sortedGoods.reverse();
  }

  return sortedGoods;
}

export const App = () => {
  const [sortField, setSortField] = useState('');
  const [isReversed, setIsReversed] = useState(false);
  const visibleGoods = getSortedGoods(goodsFromServer, {
    sortField,
    isReversed,
  });
  const isResetButtonVisible = sortField || isReversed;

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={classNames('button', 'is-info', {
            'is-light': sortField !== SortField.SORT_ALPHABETICALLY,
          })}
          onClick={() => setSortField(SortField.SORT_ALPHABETICALLY)}
        >
          {SortField.SORT_ALPHABETICALLY}
        </button>

        <button
          type="button"
          className={classNames('button', 'is-success', {
            'is-light': sortField !== SortField.SORT_BY_LENGTH,
          })}
          onClick={() => setSortField(SortField.SORT_BY_LENGTH)}
        >
          {SortField.SORT_BY_LENGTH}
        </button>

        <button
          type="button"
          className={classNames('button', 'is-warning', {
            'is-light': !isReversed,
          })}
          onClick={() => setIsReversed(prev => !prev)}
        >
          Reverse
        </button>

        {isResetButtonVisible && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setSortField('');
              setIsReversed(false);
            }}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {visibleGoods.map(good => (
          <li data-cy="Good" key={good}>
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
