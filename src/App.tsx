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
  SORT_ALPHABETICALLY = 'name',
  SORT_BY_LENGTH = 'length',
  none = '',
}

function getPreparedGoods(
  goods: string[],
  sortField: SortType,
  reverse: boolean,
) {
  const preparedGoods = [...goods];

  if (sortField) {
    preparedGoods.sort((nameA, nameB) => {
      switch (sortField) {
        case SortType.SORT_ALPHABETICALLY:
          return nameA.localeCompare(nameB);

        case SortType.SORT_BY_LENGTH:
          return nameA.length - nameB.length;

        default:
          return 0;
      }
    });
  }

  if (reverse) {
    preparedGoods.reverse();
  }

  return preparedGoods;
}

export const App: React.FC = () => {
  const [sortField, setSortField] = useState(SortType.none);
  const [reverse, setReverse] = useState(false);

  const visibleGoods = getPreparedGoods(goodsFromServer, sortField, reverse);

  const reset = () => {
    setSortField(SortType.none);
    setReverse(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button is-info', {
            'is-light': sortField !== SortType.SORT_ALPHABETICALLY,
          })}
          onClick={() => setSortField(SortType.SORT_ALPHABETICALLY)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button is-success', {
            'is-light': sortField !== SortType.SORT_BY_LENGTH,
          })}
          onClick={() => setSortField(SortType.SORT_BY_LENGTH)}
        >
          Sort by length
        </button>

        <button
          onClick={() => setReverse(!reverse)}
          type="button"
          className={cn('button is-warning', { 'is-light': !reverse })}
        >
          Reverse
        </button>

        {(sortField || reverse) && (
          <button
            onClick={reset}
            type="button"
            className="button is-danger is-light"
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
