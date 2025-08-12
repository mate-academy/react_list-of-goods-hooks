import React, { useState } from 'react';
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
  None = 'None',
  Alphabetically = 'Alphabetically',
  ByLength = 'ByLength',
}

const getSortedGoods = (goods: string[], sortType: SortType): string[] => {
  const preparedGoods = [...goods];

  switch (sortType) {
    case SortType.Alphabetically:
      return preparedGoods.sort((a, b) => a.localeCompare(b));

    case SortType.ByLength:
      return preparedGoods.sort((a, b) => a.length - b.length);

    case SortType.None:
    default:
      return preparedGoods;
  }
};

export const App: React.FC = () => {
  const [sortType, setSortType] = useState<SortType>(SortType.None);
  const [revers, setRevers] = useState(false);

  let visibleGoods = getSortedGoods(goodsFromServer, sortType);

  if (revers) {
    visibleGoods = visibleGoods.toReversed();
  }

  const handleSort = (type: SortType) => {
    setSortType(type);
  };

  const handleReverse = () => {
    setRevers(prev => !prev);
  };

  const handleReset = () => {
    setSortType(SortType.None);
    setRevers(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${sortType !== SortType.Alphabetically ? 'is-light' : ''}`}
          onClick={() => handleSort(SortType.Alphabetically)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${sortType !== SortType.ByLength ? 'is-light' : ''}`}
          onClick={() => handleSort(SortType.ByLength)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${!revers ? 'is-light' : ''}`}
          onClick={handleReverse}
        >
          Reverse
        </button>

        {(sortType !== SortType.None || revers) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={handleReset}
          >
            Reset
          </button>
        )}
      </div>

      {visibleGoods.length === 0 ? (
        <p>No goods available</p>
      ) : (
        <ul>
          {visibleGoods.map(good => (
            <li data-cy="Good" key={good}>
              {good}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
