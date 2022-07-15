import React, { useState } from 'react';
import classNames from 'classnames';
import './App.css';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const goodsFromServer: string[] = [
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
  LENGTH,
  ALPHABET,
  DEFAULT,
}

export const App: React.FC = () => {
  let goods: string[] = [...goodsFromServer];
  const [isStarted, setIsStarted] = useState(false);
  const [isReversed, setIsReversed] = useState(false);
  const [sortBy, getSorted] = useState<SortBy>(SortBy.DEFAULT);

  switch (sortBy) {
    case SortBy.ALPHABET:
      goods = [...goodsFromServer].sort((g1, g2) => g1.localeCompare(g2));
      break;
    case SortBy.LENGTH:
      goods = [...goodsFromServer].sort((g1, g2) => g1.length - g2.length);
      break;

    default:
      break;
  }

  const reset = () => {
    setIsReversed(false);
    getSorted(SortBy.DEFAULT);
  };

  if (isReversed) {
    goods.reverse();
  }

  return (
    <div className="App">
      <button
        type="button"
        className={classNames(
          'start', { start__invisible: isStarted },
        )}
        onClick={() => setIsStarted(true)}
      >
        Start
      </button>

      {isStarted && (
        <div>
          <button
            type="button"
            className="button SortAlphabetically is-dark is-medium"
            onClick={() => getSorted(SortBy.ALPHABET)}
          >
            Sort alphabetically
          </button>

          <button
            type="button"
            className="button SortByLength is-success is-medium"
            onClick={() => getSorted(SortBy.LENGTH)}
          >
            Sort by length
          </button>

          <button
            type="button"
            className="button reverse is-danger is-medium"
            onClick={() => setIsReversed(!isReversed)}
          >
            Reverse
          </button>

          <button
            type="button"
            className="button Reset is-medium"
            onClick={reset}
          >
            Reset
          </button>

          <ul className="Goods">
            {goods.map(good => (
              <li className="Goods__item" key={good}>{good}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
