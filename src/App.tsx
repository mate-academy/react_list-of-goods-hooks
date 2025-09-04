import 'bulma/css/bulma.css';
import './App.scss';
import React, { useState, useMemo } from 'react';

// O enum SortType exigido
enum SortType {
  Original = 'original',
  Alphabetical = 'alphabetical',
  Length = 'length',
}

export const goodsFromServer: string[] = [
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
  const [sortType, setSortType] = useState<SortType>(SortType.Original);
  const [isReversed, setIsReversed] = useState<boolean>(false);

  const baseGoods = useMemo(() => {
    switch (sortType) {
      case SortType.Alphabetical:
        return [...goodsFromServer].sort((a, b) => a.localeCompare(b));
      case SortType.Length:
        return [...goodsFromServer].sort(
          (a, b) => a.length - b.length || a.localeCompare(b),
        );
      case SortType.Original:
      default:
        return [...goodsFromServer];
    }
  }, [sortType]);

  const goods = useMemo(
    () => (isReversed ? [...baseGoods].reverse() : baseGoods),
    [baseGoods, isReversed],
  );

  // Handlers
  const handleSortAlphabetically = () => {
    setSortType(SortType.Alphabetical);
  };

  const handleSortByLength = () => {
    setSortType(SortType.Length);
  };

  const handleReverse = () => setIsReversed(prev => !prev);

  const handleReset = () => {
    setSortType(SortType.Original);
    setIsReversed(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${sortType === SortType.Alphabetical ? '' : 'is-light'}`}
          onClick={handleSortAlphabetically}
          data-cy="SortByName"
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${sortType === SortType.Length ? '' : 'is-light'}`}
          onClick={handleSortByLength}
          data-cy="SortByLength"
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${isReversed ? '' : 'is-light'}`}
          onClick={handleReverse}
          data-cy="Reverse"
        >
          Reverse
        </button>

        {(sortType !== SortType.Original || isReversed) && (
          <button
            type="button"
            className="button is-danger"
            onClick={handleReset}
            data-cy="Reset"
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {goods.map(good => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
