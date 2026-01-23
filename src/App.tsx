import React, { useMemo, useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';

enum SortMode {
  Alphabetically,
  Length,
  Reset,
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
  const [activeSort, setActiveSort] = useState<SortMode>(SortMode.Reset);
  const [isReversed, setIsReversed] = useState(false);

  const goods = useMemo(() => {
    let result = [...goodsFromServer];

    switch (activeSort) {
      case SortMode.Alphabetically:
        result.sort();
        break;

      case SortMode.Length:
        result.sort((a, b) => a.length - b.length);
        break;

      case SortMode.Reset:
      default:
        break;
    }

    if (isReversed) {
      result.reverse();
    }

    return result;
  }, [activeSort, isReversed]);

  const handleReset = () => {
    setActiveSort(SortMode.Reset);
    setIsReversed(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          onClick={() => setActiveSort(SortMode.Alphabetically)}
          className={`button is-info ${
            activeSort === SortMode.Alphabetically ? 'is-active' : 'is-light'
          }`}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          onClick={() => setActiveSort(SortMode.Length)}
          className={`button is-success ${
            activeSort === SortMode.Length ? 'is-active' : 'is-light'
          }`}
        >
          Sort by length
        </button>

        <button
          type="button"
          onClick={() => setIsReversed(prev => !prev)}
          className={`button is-warning ${
            isReversed ? 'is-active' : 'is-light'
          }`}
        >
          Reverse
        </button>

        {activeSort !== SortMode.Reset || isReversed ? (
          <button
            type="button"
            onClick={handleReset}
            className="button is-danger is-active"
          >
            Reset
          </button>
        ) : null}
      </div>

      <ul>
        {goods.map(good => (
          <li data-cy="Good" key={good}>
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
