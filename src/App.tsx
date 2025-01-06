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
  ByLength = 'ByLength',
  Alphabetically = 'Alphabetically',
  Default = '',
}

function sortGoods(
  goods: string[],
  sortType: SortType | null,
  reverse: boolean,
): string[] {
  const sortedGoods = [...goods].sort((good1, good2) => {
    switch (sortType) {
      case SortType.Alphabetically:
        return good1.localeCompare(good2);

      case SortType.ByLength:
        return good1.length - good2.length;

      default:
        return 0;
    }
  });

  return reverse ? sortedGoods.reverse() : sortedGoods;
}

export const App: React.FC = () => {
  const [sort, setSort] = useState<SortType>(SortType.Default);
  const [isReversed, setIsReversed] = useState<boolean>(false);

  const isResetButtonVisible = sort || isReversed;

  const resultSortedGoods = sortGoods(goodsFromServer, sort, isReversed);

  const handleToggleSortType = (type: SortType) => {
    setSort(type === sort ? SortType.Default : type);
  };

  const handleReset = () => {
    setIsReversed(false);
    setSort(SortType.Default);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={classNames('button', 'is-info', {
            'is-light': sort !== SortType.Alphabetically,
          })}
          onClick={() => handleToggleSortType(SortType.Alphabetically)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={classNames('button', 'is-success', {
            'is-light': sort !== SortType.ByLength,
          })}
          onClick={() => handleToggleSortType(SortType.ByLength)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={classNames('button', 'is-warning', {
            'is-light': !isReversed,
          })}
          onClick={() => setIsReversed(prev => !prev)}
        >
          Reverse
        </button>
        {isResetButtonVisible && (
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
        {resultSortedGoods.map(good => (
          <li data-cy="Good" key={good}>
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
