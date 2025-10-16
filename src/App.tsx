import React, { useState, useMemo } from 'react';
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
  None = 'none',
  Alphabetically = 'alphabetically',
  Length = 'length',
}

export const App: React.FC = () => {
  const [sortType, setSortType] = useState<SortType>(SortType.None);
  const [isReversed, setIsReversed] = useState(false);

  const visibleGoods = useMemo(() => {
    const sortedGoods = [...goodsFromServer];

    switch (sortType) {
      case SortType.Alphabetically:
        sortedGoods.sort((a, b) => a.localeCompare(b));
        break;

      case SortType.Length:
        sortedGoods.sort((a, b) => a.length - b.length);
        break;
    }

    if (isReversed) {
      sortedGoods.reverse();
    }

    return sortedGoods;
  }, [sortType, isReversed]);

  const handleSortAlphabetically = () => setSortType(SortType.Alphabetically);
  const handleSortByLength = () => setSortType(SortType.Length);
  const handleReverse = () => setIsReversed(prev => !prev);
  const handleReset = () => {
    setSortType(SortType.None);
    setIsReversed(false);
  };

  const isModified = sortType !== SortType.None || isReversed;

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={classNames('button', 'is-info', {
            'is-light': sortType !== SortType.Alphabetically,
          })}
          onClick={handleSortAlphabetically}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={classNames('button', 'is-success', {
            'is-light': sortType !== SortType.Length,
          })}
          onClick={handleSortByLength}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={classNames('button', 'is-warning', {
            'is-light': !isReversed,
          })}
          onClick={handleReverse}
        >
          Reverse
        </button>

        {isModified && (
          <button
            type="button"
            className={classNames('button', 'is-danger', 'is-light')}
            onClick={handleReset}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {visibleGoods.map(good => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
