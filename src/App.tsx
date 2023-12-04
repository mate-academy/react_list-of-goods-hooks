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
  default,
  name,
  length,
}

function getPreparedGoods(
  goods: string[],
  sortField: SortType,
  reverse: boolean,
) {
  const preparedGoods = [...goods];

  if (sortField !== SortType.default) {
    preparedGoods.sort((firstGood, secondGood) => {
      switch (sortField) {
        case SortType.name:
          return firstGood.localeCompare(secondGood);

        case SortType.length:
          return firstGood.length - secondGood.length;

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
  const [reverse, setReverse] = useState(false);
  const [sortField, setSortField] = useState(SortType.default);
  const visibleGoods = getPreparedGoods(goodsFromServer, sortField, reverse);

  const reset = () => {
    setSortField(SortType.default);
    setReverse(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn(
            'button',
            'is-info',
            { 'is-light': sortField !== SortType.name },
          )}
          onClick={() => setSortField(SortType.name)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn(
            'button',
            'is-success',
            { 'is-light': sortField !== SortType.length },
          )}
          onClick={() => setSortField(SortType.length)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn(
            'button',
            'is-warning',
            { 'is-light': !reverse },
          )}
          onClick={() => (reverse ? setReverse(false) : setReverse(true))}
        >
          Reverse
        </button>

        {(sortField || reverse) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={reset}
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
