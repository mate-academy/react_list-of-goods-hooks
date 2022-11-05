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

enum SortBy {
  ALPABET = 'alphabet',
  LENGTH = 'length',
}

export const App: React.FC = () => {
  const [isReversed, setIsReversed] = useState(false);
  const [sortBy, setSortBy] = useState('');

  const sortAlphabet = () => {
    setSortBy(SortBy.ALPABET);
  };

  const sortLength = () => {
    setSortBy(SortBy.LENGTH);
  };

  const reverse = () => {
    setIsReversed(!isReversed);
  };

  const reset = () => {
    setIsReversed(false);
    setSortBy('');
  };

  const visibleGoods = [...goodsFromServer];

  visibleGoods.sort((a, b) => {
    switch (sortBy) {
      case SortBy.ALPABET:
        return a.localeCompare(b);
      case SortBy.LENGTH:
        return a[sortBy] - b[sortBy];
      default:
        return 0;
    }
  });

  if (isReversed) {
    visibleGoods.reverse();
  }

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={classNames('button', {
            'is-info is-light': sortBy !== SortBy.ALPABET,
            'is-info': sortBy === SortBy.ALPABET,
          })}
          onClick={sortAlphabet}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={classNames('button', {
            'is-success is-light': sortBy !== SortBy.LENGTH,
            'is-success': sortBy === SortBy.LENGTH,
          })}
          onClick={sortLength}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={classNames('button', {
            'is-warning is-light': !isReversed,
            'is-warning': isReversed,
          })}
          onClick={reverse}
        >
          Reverse
        </button>

        {(sortBy || isReversed) && (
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
          <li
            data-cy="Good"
            key={good}
          >
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
