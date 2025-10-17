import React, { useState, useMemo } from 'react';

import 'bulma/css/bulma.css';
import './App.scss';

export enum SortType {
  Default = 'default',
  Alphabet = 'alphabet',
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
  const [sortType, setSortType] = useState<SortType>(SortType.Default);
  const [isReversed, setIsReversed] = useState(false);

  const sortedGoods = useMemo(() => {
    const items = [...goodsFromServer];

    if (sortType !== SortType.Default) {
      items.sort((a, b) => {
        switch (sortType) {
          case SortType.Alphabet:
            return a.localeCompare(b);
          case SortType.Length:
            return a.length - b.length;
          default:
            return 0;
        }
      });
    }

    if (isReversed) {
      items.reverse();
    }

    return items;
  }, [sortType, isReversed]);

  const isChanged = sortType !== SortType.Default || isReversed;

  const handleSortByAlphabet = () => setSortType(SortType.Alphabet);

  const handleSortByLength = () => setSortType(SortType.Length);

  const handleReverse = () => setIsReversed(prev => !prev);

  const handleReset = () => {
    setSortType(SortType.Default);
    setIsReversed(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          aria-pressed={sortType === SortType.Alphabet}
          className={`button is-info ${sortType !== SortType.Alphabet ? 'is-light' : ''}`}
          onClick={handleSortByAlphabet}
        >
          Sort alphabetically
        </button>

        <button
          aria-pressed={sortType === SortType.Length}
          type="button"
          className={`button is-success ${sortType !== SortType.Length ? 'is-light' : ''}`}
          onClick={handleSortByLength}
        >
          Sort by length
        </button>

        <button
          aria-pressed={isReversed}
          type="button"
          className={`button is-warning ${!isReversed ? 'is-light' : ''}`}
          onClick={handleReverse}
        >
          Reverse
        </button>

        {isChanged && (
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
        {sortedGoods.map(good => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
