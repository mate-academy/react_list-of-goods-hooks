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
  NONE = 'NONE',
  ALPHABETICAL = 'ALPHABETICAL',
  BY_LENGTH = 'BY_LENGTH',
}

export const App: React.FC = () => {
  const [sortType, setSortType] = useState<SortType>(SortType.NONE);
  const [isReversed, setIsReversed] = useState(false);

  const sortedGoods = useMemo(() => {
    let sorted = [...goodsFromServer];

    if (sortType === SortType.ALPHABETICAL) {
      sorted.sort((a, b) => a.localeCompare(b));
    } else if (sortType === SortType.BY_LENGTH) {
      sorted.sort((a, b) => a.length - b.length);
    }

    if (isReversed) {
      sorted.reverse();
    }

    return sorted;
  }, [sortType, isReversed]);

  const hasChanges = sortType !== SortType.NONE || isReversed;

  const handleSortAlphabetically = () => {
    if (sortType === SortType.ALPHABETICAL) {
      setSortType(SortType.NONE);
      setIsReversed(false);
    } else {
      setSortType(SortType.ALPHABETICAL);
    }
  };

  const handleSortByLength = () => {
    if (sortType === SortType.BY_LENGTH) {
      setSortType(SortType.NONE);
      setIsReversed(false);
    } else {
      setSortType(SortType.BY_LENGTH);
    }
  };

  const handleReverse = () => {
    setIsReversed(!isReversed);
  };

  const handleReset = () => {
    setSortType(SortType.NONE);
    setIsReversed(false);
  };

  const isSortAlphabeticalActive = sortType === SortType.ALPHABETICAL;
  const isSortByLengthActive = sortType === SortType.BY_LENGTH;
  const isReverseActive = isReversed;

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={classNames('button is-info', {
            'is-light': !isSortAlphabeticalActive,
          })}
          onClick={handleSortAlphabetically}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={classNames('button is-success', {
            'is-light': !isSortByLengthActive,
          })}
          onClick={handleSortByLength}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={classNames('button is-warning', {
            'is-light': !isReverseActive,
          })}
          onClick={handleReverse}
        >
          Reverse
        </button>

        {hasChanges && (
          <button
            type="button"
            className="button is-danger"
            onClick={handleReset}
          >
            Reset
          </button>
        )}
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
