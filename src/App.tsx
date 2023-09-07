import React, { useState } from 'react';
import cn from 'classnames';
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

enum SortedGoods {
  Alpha,
  None,
  Length,
}

type Options = {
  sortedGoods: SortedGoods,
  isGoodReversed: boolean,
};

function getGoodsSorted(
  goods: string[],
  { sortedGoods, isGoodReversed }: Options,
) {
  const copyGoods = [...goods];

  if (sortedGoods === SortedGoods.Alpha) {
    copyGoods.sort((a, b) => a.localeCompare(b));
  }

  if (sortedGoods === SortedGoods.Length) {
    copyGoods.sort((a, b) => a.length - b.length);
  }

  if (isGoodReversed) {
    copyGoods.reverse();
  }

  return copyGoods;
}

export const App: React.FC = () => {
  const [sortedGoods, setSortedGoods] = useState(SortedGoods.None);
  const [isGoodReversed, setIsGoodReversed] = useState(false);
  const sorted = getGoodsSorted(
    goodsFromServer,
    { sortedGoods, isGoodReversed },
  );

  const hadnlingReset = () => {
    setSortedGoods(SortedGoods.None);
    setIsGoodReversed(false);
  };

  const isResetButtonVisible = sortedGoods !== SortedGoods.None
    || isGoodReversed;

  const makeGoodsSortedAlpha = () => setSortedGoods(SortedGoods.Alpha);

  const makeGoodsSortedLength = () => setSortedGoods(SortedGoods.Length);

  const makeGoodsReversed = () => setIsGoodReversed(!isGoodReversed);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn(
            'button',
            'is-info',
            { 'is-light': sortedGoods !== SortedGoods.Alpha },
          )}
          onClick={makeGoodsSortedAlpha}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn(
            'button',
            'is-success',
            { 'is-light': sortedGoods !== SortedGoods.Length },
          )}
          onClick={makeGoodsSortedLength}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn(
            'button',
            'is-warning',
            { 'is-light': !isGoodReversed },
          )}
          onClick={makeGoodsReversed}
        >
          Reverse
        </button>

        {isResetButtonVisible && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={hadnlingReset}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {sorted.map(good => (
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
