import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
import classnames from 'classnames';

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
  NONE,
  ALPHABET,
  LENGTH,
}

export const App: React.FC = () => {
  const visibleGoods = [...goodsFromServer];
  const [sortType, setSortType] = useState(SortType.NONE);
  const [isReversed, setIsReversed] = useState(false);

  visibleGoods.sort((a, b): SortType => {
    switch (sortType) {
      case SortType.LENGTH:
        return a.length - b.length;

      case SortType.ALPHABET:
        return a.localeCompare(b);

      default:
        return 0;
    }
  });

  if (isReversed) {
    visibleGoods.reverse();
  }

  const sortAlpha = () => {
    setSortType(SortType.ALPHABET);
  };

  const sortLength = () => {
    setSortType(SortType.LENGTH);
  };

  const reverseIt = () => {
    setIsReversed(!isReversed);
  };

  const resetIt = () => {
    setSortType(SortType.NONE);
    setIsReversed(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={classnames('button', 'is-info',
            sortType !== SortType.ALPHABET && 'is-light')}
          onClick={sortAlpha}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={classnames('button', 'is-success',
            sortType !== SortType.LENGTH && 'is-light')}
          onClick={sortLength}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={classnames('button', 'is-warning',
            !isReversed && 'is-light')}
          onClick={reverseIt}
        >
          Reverse
        </button>

        {
          (sortType !== SortType.NONE || isReversed) && (
            <button
              type="button"
              className="button is-danger is-light"
              onClick={resetIt}
            >
              Reset
            </button>
          )
        }
      </div>

      <ul>
        {
          visibleGoods.map((good) => (
            <li data-cy="Good" key={good}>
              {good}
            </li>
          ))
        }
      </ul>
    </div>
  );
};
