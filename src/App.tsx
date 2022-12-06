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
  NONE,
  ALPHABET,
  LENGTH,
}

export const App: React.FC = () => {
  const visibleGoods = [...goodsFromServer];
  const [isReversed, setIsReversed] = useState(false);
  const [sortBy, setSortBy] = useState(SortType.NONE);

  function reset() {
    setIsReversed(false);
    setSortBy(SortType.NONE);
  }

  if (sortBy === SortType.ALPHABET) {
    visibleGoods.sort();
  }

  if (sortBy === SortType.LENGTH) {
    visibleGoods.sort((good1, good2) => {
      return good1.length - good2.length;
    });
  }

  if (isReversed) {
    visibleGoods.reverse();
  }

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => setSortBy(SortType.ALPHABET)}
          type="button"
          className={classNames(
            {
              'button is-info is-light':
                sortBy !== SortType.ALPHABET,
            },
            {
              'button is-info':
                sortBy === SortType.ALPHABET,
            },
          )}
        >
          Sort alphabetically
        </button>

        <button
          onClick={() => setSortBy(SortType.LENGTH)}
          type="button"
          className={classNames(
            {
              'button is-success is-light':
                sortBy !== SortType.LENGTH,
            },
            {
              'button is-success':
                sortBy === SortType.LENGTH,
            },
          )}
        >
          Sort by length
        </button>

        <button
          onClick={() => setIsReversed(!isReversed)}
          type="button"
          className={classNames(
            {
              'button is-warning is-light': isReversed === false,
            },
            {
              'button is-warning': isReversed === true,
            },
          )}
        >
          Reverse
        </button>

        {
          (sortBy !== SortType.NONE || isReversed === true)
            && (
              <button
                onClick={reset}
                type="button"
                className="button is-danger is-light"
              >
                Reset
              </button>
            )
        }
      </div>

      <ul>
        {visibleGoods.map(good => <li data-cy="Good">{good}</li>)}
      </ul>
    </div>
  );
};
