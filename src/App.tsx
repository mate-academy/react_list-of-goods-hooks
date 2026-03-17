import React, { useState, useMemo } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';

enum SortType {
  Default = 'default',
  Alphabetical = 'alphabetical',
  Length = 'length',
}

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

export const App: React.FC = () => {
  const [sortMethod, setSortMethod] = useState<SortType>(SortType.Default);
  const [isReversed, setIsReversed] = useState(false);

  const visibleGoods = useMemo(() => {
    const result = [...goodsFromServer];

    if (sortMethod === SortType.Alphabetical) {
      result.sort((a, b) => a.localeCompare(b));
    } else if (sortMethod === SortType.Length) {
      result.sort((a, b) => a.length - b.length);
    }

    if (isReversed) {
      result.reverse();
    }

    return result;
  }, [sortMethod, isReversed]);

  const handleReset = () => {
    setSortMethod(SortType.Default);
    setIsReversed(false);
  };

  const isAnyFilterActive = sortMethod !== SortType.Default || isReversed;

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${sortMethod === SortType.Alphabetical ? 'is-active' : 'is-light'}`}
          onClick={() => setSortMethod(SortType.Alphabetical)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${sortMethod === SortType.Length ? 'is-active' : 'is-light'}`}
          onClick={() => setSortMethod(SortType.Length)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${isReversed ? 'is-active' : 'is-light'}`}
          onClick={() => setIsReversed(!isReversed)}
        >
          Reverse
        </button>

        {isAnyFilterActive && (
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
        {visibleGoods.map(good => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
