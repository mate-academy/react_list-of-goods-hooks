import React, { useMemo, useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';

export enum SortType {
  None = 'none',
  Alphabetically = 'alphabetically',
  ByLength = 'byLength',
}

const goodsFromServer: string[] = [
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

export const App: React.FC = () => {
  const [sortType, setSortType] = useState<SortType>(SortType.None);
  const [isReversed, setIsReversed] = useState(false);

  const getVisibleGoods = () => {
    const result = [...goodsFromServer];

    if (sortType === SortType.Alphabetically) {
      result.sort((a, b) => a.localeCompare(b));
    } else if (sortType === SortType.ByLength) {
      result.sort((a, b) => a.length - b.length);
    }

    if (isReversed) {
      result.reverse();
    }

    return result;
  };

  const goods = useMemo(getVisibleGoods, [sortType, isReversed]);

  const handleSort = (type: SortType) => {
    setSortType(type);
  };

  const handleReverse = () => {
    setIsReversed(prev => !prev);
  };

  const handleReset = () => {
    setSortType(SortType.None);
    setIsReversed(false);
  };

  const isModified = () => sortType !== SortType.None || isReversed;

  const getButtonClass = (active: boolean) =>
    `button ${active ? '' : 'is-light'}`;

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`is-info ${getButtonClass(sortType === SortType.Alphabetically)}`}
          onClick={() => handleSort(SortType.Alphabetically)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`is-success ${getButtonClass(sortType === SortType.ByLength)}`}
          onClick={() => handleSort(SortType.ByLength)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`is-warning ${getButtonClass(isReversed)}`}
          onClick={handleReverse}
        >
          Reverse
        </button>

        {isModified() && (
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
        {goods.map((good, index) => (
          <li key={index} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
