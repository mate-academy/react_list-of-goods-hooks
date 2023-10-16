import React, { useMemo, useState } from 'react';
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
  Default,
  Alphabetical,
  Length,
}

function getSortedGoods(
  goods: string[],
  sortType: SortType,
  isReverseActive: boolean,
) {
  let sorted = [...goods];

  if (sortType === SortType.Alphabetical) {
    sorted = sorted.sort();
  } else if (sortType === SortType.Length) {
    sorted = sorted.sort((good1, good2) => good1.length - good2.length);
  }

  if (isReverseActive) {
    sorted = sorted.reverse();
  }

  return sorted;
}

export const App: React.FC = () => {
  const [sortType, setSortType] = useState<SortType>(SortType.Default);
  const [isReverseActive, setIsReverseActive] = useState(false);

  const resetGoods = () => {
    setSortType(SortType.Default);
    setIsReverseActive(false);
  };

  const sortedGoods = useMemo(() => getSortedGoods(
    goodsFromServer,
    sortType,
    isReverseActive,
  ), [sortType, isReverseActive]);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={classNames(
            'button', 'is-info',
            { 'is-light': sortType !== SortType.Alphabetical },
          )}
          onClick={() => {
            setSortType(SortType.Alphabetical);
          }}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={classNames(
            'button', 'is-success',
            { 'is-light': sortType !== SortType.Length },
          )}
          onClick={() => {
            setSortType(SortType.Length);
          }}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={classNames(
            'button', 'is-warning',
            { 'is-light': !isReverseActive },
          )}
          onClick={() => {
            setIsReverseActive(prev => !prev);
          }}
        >
          Reverse
        </button>

        {sortType !== SortType.Default || isReverseActive ? (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={resetGoods}
          >
            Reset
          </button>
        ) : null}
      </div>

      <ul>
        {sortedGoods.map((good) => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
