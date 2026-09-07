import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
import cn from 'classnames';
import { GoodsList } from './components/GoodsList/GoodsList';

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
  const [sortBy, setSortBy] = useState(SortType.NONE);
  const [isReversed, setIsReversed] = useState(false);

  function getCurrentGoods() {
    const currentGoods = [...goodsFromServer];

    if (sortBy === SortType.ALPHABET) {
      currentGoods.sort((a, b) => a.localeCompare(b));
    }

    if (sortBy === SortType.LENGTH) {
      currentGoods.sort((a, b) => a.length - b.length);
    }

    if (isReversed) {
      currentGoods.reverse();
    }

    return currentGoods;
  }

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button', 'is-info', {
            'is-light': sortBy !== SortType.ALPHABET,
          })}
          onClick={() => setSortBy(SortType.ALPHABET)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button', 'is-success', {
            'is-light': sortBy !== SortType.LENGTH,
          })}
          onClick={() => setSortBy(SortType.LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button', 'is-warning', {
            'is-light': !isReversed,
          })}
          onClick={() => setIsReversed(!isReversed)}
        >
          Reverse
        </button>

        {(sortBy !== SortType.NONE || isReversed) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setSortBy(SortType.NONE);
              setIsReversed(false);
            }}
          >
            Reset
          </button>
        )}
      </div>
      <GoodsList goods={getCurrentGoods()} />
    </div>
  );
};
