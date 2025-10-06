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

export enum SortType {
  Default = 'default',
  Alphabet = 'alphabet',
  Length = 'length',
}

export const App: React.FC = () => {
  const [sortType, setSortType] = useState<SortType>(SortType.Default);
  const [isReversed, setIsReversed] = useState(false);

  const hasChanges = sortType !== SortType.Default || isReversed;

  const sortedGoods = useMemo(() => {
    const result = [...goodsFromServer];

    if (sortType === SortType.Alphabet) {
      result.sort((a, b) => a.localeCompare(b));
    }

    if (sortType === SortType.Length) {
      result.sort((a, b) => a.length - b.length);
    }

    if (isReversed) {
      result.reverse();
    }

    return result;
  }, [sortType, isReversed]);

  const handleSortAlphabet = () => setSortType(SortType.Alphabet);
  const handleSortLength = () => setSortType(SortType.Length);
  const handleReverse = () => setIsReversed(prev => !prev);
  const handleReset = () => {
    setSortType(SortType.Default);
    setIsReversed(false);
  };

  const inactiveClass = 'is-light';

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${sortType === SortType.Alphabet ? '' : inactiveClass}`}
          onClick={handleSortAlphabet}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${sortType === SortType.Length ? '' : inactiveClass}`}
          onClick={handleSortLength}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${isReversed ? '' : inactiveClass}`}
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
        {sortedGoods.map(g => (
          <li key={g} data-cy="Good">
            {g}
          </li>
        ))}
      </ul>
    </div>
  );
};
