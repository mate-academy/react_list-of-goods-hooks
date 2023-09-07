import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
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
  Alphabetic,
  Length,
  None,
}

type Options = {
  sortedGoods: SortType,
  isReversed: boolean
};

function getSortedGoods(
  goods: string[],
  { sortedGoods, isReversed }: Options,
) {
  const copyGoods = [...goods];

  if (sortedGoods === SortType.Alphabetic) {
    copyGoods.sort((a, b) => a.localeCompare(b));
  }

  if (sortedGoods === SortType.Length) {
    copyGoods.sort((a, b) => a.length - b.length);
  }

  if (isReversed) {
    copyGoods.reverse();
  }

  return copyGoods;
}

export const App: React.FC = () => {
  const [sortedGoods, setSortedGoods] = useState(SortType.None);
  const [isReversed, setIsReversed] = useState(false);
  const sorted = getSortedGoods(
    goodsFromServer,
    { sortedGoods, isReversed },
  );

  const handleReset = () => {
    setSortedGoods(SortType.None);
    setIsReversed(false);
  };

  const isResetBtnVisible = sortedGoods !== SortType.None || isReversed;

  const handleSort = (sortType: SortType) => setSortedGoods(sortType);

  const handleReversed = () => setIsReversed(!isReversed);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn(
            'button',
            'is-info',
            { 'is-light': sortedGoods !== SortType.Alphabetic },
          )}
          onClick={() => handleSort(SortType.Alphabetic)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn(
            'button',
            'is-success',
            { 'is-light': sortedGoods !== SortType.Length },
          )}
          onClick={() => handleSort(SortType.Length)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn(
            'button',
            'is-warning',
            { 'is-light': !isReversed },
          )}
          onClick={handleReversed}
        >
          Reverse
        </button>

        {isResetBtnVisible && (
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
