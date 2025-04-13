import 'bulma/css/bulma.css';
import './App.scss';
import { useState } from 'react';
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
  NONE = '',
  ALPHABET = 'Sort alphabetically',
  LENGTH = 'Sort by length',
}

function getPreparedGoods(
  goods: string[],
  sortBy: SortType,
  isReversed: boolean,
) {
  const sortedGoods = [...goods];

  if (sortBy === SortType.ALPHABET) {
    sortedGoods.sort((a, b) => a.localeCompare(b));
  }

  if (sortBy === SortType.LENGTH) {
    sortedGoods.sort((a, b) => a.length - b.length);
  }

  return isReversed ? sortedGoods.reverse() : sortedGoods;
}

export const App = () => {
  const [sortBy, setSortBy] = useState(SortType.NONE);
  const [isReversed, setIsReversed] = useState(false);
  const goods = getPreparedGoods(goodsFromServer, sortBy, isReversed);

  function handleReset() {
    setSortBy(SortType.NONE);
    setIsReversed(false);
  }

  function toggleReversed() {
    setIsReversed(prev => !prev);
  }

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button', 'is-info', {
            'is-light': sortBy !== SortType.ALPHABET,
          })}
          onClick={() => {
            setSortBy(SortType.ALPHABET);
          }}
        >
          {SortType.ALPHABET}
        </button>

        <button
          type="button"
          className={cn('button', 'is-success', {
            'is-light': sortBy !== SortType.LENGTH,
          })}
          onClick={() => {
            setSortBy(SortType.LENGTH);
          }}
        >
          {SortType.LENGTH}
        </button>

        <button
          type="button"
          className={cn('button', 'is-warning', {
            'is-light': !isReversed,
          })}
          onClick={toggleReversed}
        >
          Reverse
        </button>

        {(sortBy || isReversed) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={handleReset}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {goods.map(good => (
          <li data-cy="Good" key={good}>
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
