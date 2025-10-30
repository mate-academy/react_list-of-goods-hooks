import React, { useMemo, useState } from 'react';
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
  Alphabet = 'alphabet',
  Length = 'length',
}

export const App: React.FC = () => {
  const [sortBy, setSortBy] = useState<SortType>(SortType.None);
  const [isReversed, setIsReversed] = useState(false);

  const visibleGoods = useMemo(() => {
    const prepared = [...goodsFromServer];

    switch (sortBy) {
      case SortType.Alphabet:
        prepared.sort((a, b) => a.localeCompare(b));
        break;

      case SortType.Length:
        prepared.sort((a, b) => a.length - b.length);
        break;

      case SortType.None:
      default:
        break;
    }

    if (isReversed) {
      prepared.reverse();
    }

    return prepared;
  }, [sortBy, isReversed]);

  const hasChanges = sortBy !== SortType.None || isReversed;

  const handleReset = () => {
    setSortBy(SortType.None);
    setIsReversed(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${sortBy === SortType.Alphabet ? '' : 'is-light'}`}
          onClick={() => setSortBy(SortType.Alphabet)}
          data-cy="SortByName"
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${sortBy === SortType.Length ? '' : 'is-light'}`}
          onClick={() => setSortBy(SortType.Length)}
          data-cy="SortByLength"
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${isReversed ? '' : 'is-light'}`}
          onClick={() => setIsReversed(prev => !prev)}
          data-cy="Reverse"
        >
          Reverse
        </button>

        {hasChanges && (
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
        {visibleGoods.map(good => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
