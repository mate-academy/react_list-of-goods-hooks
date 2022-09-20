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

enum SortType {
  NONE,
  ALPABET,
  LENGTH,
}

type ReorderOptions = {
  sortType: SortType,
  isReversed: boolean,
};

export function getReorderedGoods(
  goods: string[],
  { sortType, isReversed }: ReorderOptions,
) {
  const visibleGoods = [...goods];

  visibleGoods.sort((good1, good2) => {
    switch (sortType) {
      case SortType.ALPABET:
        return good1.localeCompare(good2);

      case SortType.LENGTH:
        return good1.length - good2.length;

      default:
        return 0;
    }
  });

  if (isReversed) {
    visibleGoods.reverse();
  }

  return visibleGoods;
}

export const App: React.FC = () => {
  const [isReversed, setReverse] = useState(false);
  const [sortType, setSortType] = useState(SortType.NONE);

  const handleReverse = () => {
    setReverse(state => !state);
  };

  const handleAlphSort = () => {
    setSortType(() => SortType.ALPABET);
  };

  const handleLengthSort = () => {
    setSortType(() => SortType.LENGTH);
  };

  const handleReset = () => {
    setSortType(() => SortType.NONE);
    setReverse(() => false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={
            classNames(
              'button is-info',
              { 'is-light': sortType !== SortType.ALPABET },
            )
          }
          onClick={handleAlphSort}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={
            classNames(
              'button is-success',
              { 'is-light': sortType !== SortType.LENGTH },
            )
          }
          onClick={handleLengthSort}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={
            classNames(
              'button is-warning',
              { 'is-light': !isReversed },
            )
          }
          onClick={handleReverse}
        >
          Reverse
        </button>

        {(sortType !== SortType.NONE || isReversed)
          && (
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
        <ul>
          {getReorderedGoods(goodsFromServer, { sortType, isReversed })
            .map((good) => (
              <li key={good} data-cy="Good">{good}</li>
            ))}
        </ul>
      </ul>
    </div>
  );
};
