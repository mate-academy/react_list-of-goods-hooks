import React, { useState } from 'react';
import classNames from 'classnames';
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
  alphabetic = 1,
  length = 2,
}

export const sortGoods = (goods, params) => {
  const { sortBy, isReversed } = params;
  const sortedGoods = [...goods];

  if (sortBy) {
    sortedGoods.sort((good1, good2) => {
      switch (sortBy) {
        case SortType.alphabetic:
          return good1.localeCompare(good2);
        case SortType.length:
          return good1.length - good2.length;
        default:
          throw new Error('There is no such type of sort');
      }
    });
  }

  if (isReversed) {
    sortedGoods.reverse();
  }

  return sortedGoods;
};

export const App: React.FC = () => {
  const [sortBy, setSortBy] = useState(null);
  const [isReversed, setReversed] = useState(false);

  const sortedGoods = sortGoods(goodsFromServer, { sortBy, isReversed });

  const resetAll = () => {
    setSortBy(null);
    setReversed(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={classNames('button', 'is-info', {
            'is-light': sortBy !== SortType.alphabetic,
          })}
          onClick={() => setSortBy(SortType.alphabetic)}
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
            'is-light': !isReversed,
          })}
          onClick={() => setReversed(!isReversed)}
        >
          Reverse
        </button>

        {(sortBy || isReversed) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => resetAll()}
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
