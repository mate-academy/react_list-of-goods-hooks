import React, { useMemo, useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';

enum SortType {
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
  const [activeSort, setActiveSort] = useState<SortType>(SortType.Reset);
  const [isReversed, setIsReversed] = useState(false);

  const goods = useMemo(() => {
    const result = [...goodsFromServer];

    switch (activeSort) {
      case SortType.Alphabetically:
        result.sort();
        break;

      case SortType.Length:
        result.sort((a, b) => a.length - b.length);
        break;

      case SortType.Reset:
      default:
        break;
    }

    if (isReversed) {
      result.reverse();
    }

    return result;
  }, [activeSort, isReversed]);

  const handleReset = () => {
    setActiveSort(SortType.Reset);
    setIsReversed(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          onClick={() => setActiveSort(SortType.Alphabetically)}
          className={`button is-info ${
            activeSort === SortType.Alphabetically ? 'is-active' : 'is-light'
          }`}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          onClick={() => setActiveSort(SortType.Length)}
          className={`button is-success ${
            activeSort === SortType.Length ? 'is-active' : 'is-light'
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

        {activeSort !== SortType.Reset || isReversed ? (
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
