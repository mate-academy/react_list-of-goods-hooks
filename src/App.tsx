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

type SortStatus = {
  sortBy: SortType;
  isReversed: boolean;
};

enum SortType {
  Alphabet,
  Length,
  Default,
}

function sortGoods(goods: string[], { sortBy, isReversed }: SortStatus) {
  const visibleGoods = [...goods];

  if (sortBy === SortType.Alphabet) {
    visibleGoods.sort((a, b) => a.localeCompare(b));
  } else if (sortBy === SortType.Length) {
    visibleGoods.sort((a, b) => a.length - b.length);
  }

  if (isReversed) {
    visibleGoods.reverse();
  }

  return visibleGoods;
}

export const App: React.FC = () => {
  const [sortBy, setSortBy] = useState(SortType.Default);
  const [isReversed, setReversed] = useState(false);

  const goods = sortGoods(goodsFromServer, { sortBy, isReversed });

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={classNames('button', 'is-info', {
            'is-light': sortBy !== SortType.Alphabet,
          })}
          onClick={() => setSortBy(SortType.Alphabet)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={classNames('button', 'is-success', {
            'is-light': sortBy !== SortType.Length,
          })}
          onClick={() => setSortBy(SortType.Length)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={classNames('button', 'is-warning', {
            'is-light': !isReversed,
          })}
          onClick={() => setReversed(prev => !prev)}
        >
          Reverse
        </button>

        {(sortBy !== SortType.Default || isReversed) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setSortBy(SortType.Default);
              setReversed(false);
            }}
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
