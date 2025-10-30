import React, { useMemo, useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';

export const goodsFromServer = [
  'Dumplings - $12',
  'Carrot - $2',
  'Eggs - $4',
  'Ice cream - $7.5',
  'Apple - $3',
  'Bread - $2.5',
  'Fish - $15',
  'Honey - $10',
  'Jam - $6',
  'Garlic - $1.8',
];

const getName = (s: string) => s.split(' - $')[0];

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
        prepared.sort((a, b) => getName(a).localeCompare(getName(b)));
        break;

      case SortType.Length:
        prepared.sort((a, b) => {
          const na = getName(a);
          const nb = getName(b);

          return na.length - nb.length || na.localeCompare(nb);
        });
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
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${sortBy === SortType.Length ? '' : 'is-light'}`}
          onClick={() => setSortBy(SortType.Length)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${isReversed ? '' : 'is-light'}`}
          onClick={() => setIsReversed(prev => !prev)}
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
        {visibleGoods.map(good => (
          <li key={good} data-cy="Good">
            {getName(good)}
          </li>
        ))}
      </ul>
    </div>
  );
};
