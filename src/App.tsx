import React, { useState } from 'react';
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

enum SortType {
  none,
  alphabetically,
  length,
}

function sortGoods(sortBy: SortType, reverse: boolean) {
  const result = [...goodsFromServer].sort(
    (element1: string, element2: string) => {
      switch (sortBy) {
        case SortType.alphabetically:
          return element1.localeCompare(element2);
        case SortType.length:
          return element1.length - element2.length;
        default:
          return 0;
      }
    },
  );

  return reverse ? result.toReversed() : result;
}

export const App: React.FC = () => {
  const [sortBy, setSortBy] = useState(SortType.none);
  const [reverse, setReverse] = useState(false);
  const visibleGoods = sortGoods(sortBy, reverse);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={classNames('button', 'is-info', {
            'is-light': sortBy !== SortType.alphabetically,
          })}
          onClick={() => setSortBy(SortType.alphabetically)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={classNames('button', 'is-success', {
            'is-light': sortBy !== SortType.length,
          })}
          onClick={() => setSortBy(SortType.length)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={classNames('button', 'is-warning', {
            'is-light': !reverse,
          })}
          onClick={() => setReverse(!reverse)}
        >
          Reverse
        </button>

        {(sortBy !== SortType.none || reverse) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setSortBy(SortType.none);
              setReverse(false);
            }}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        <ul>
          {visibleGoods.map(good => (
            <li data-cy="Good" key={good}>
              {good}
            </li>
          ))}
        </ul>
      </ul>
    </div>
  );
};
