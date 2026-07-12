import React, { useState, useMemo } from 'react';
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
  None = '',
  Alphabet = 'alphabet',
  Length = 'length',
}

export const App: React.FC = () => {
  const [sortType, setSortType] = useState<SortType>(SortType.None);
  const [isReversed, setIsReversed] = useState(false);
  const isChanged = sortType !== SortType.None || isReversed;

  const visibleItems = useMemo(() => {
    const items = [...goodsFromServer];

    if (sortType === SortType.Alphabet) {
      items.sort((good1, good2) => good1.localeCompare(good2));
    }

    if (sortType === SortType.Length) {
      items.sort((good1, good2) => good1.length - good2.length);
    }

    if (isReversed) {
      items.reverse();
    }

    return items;
  }, [sortType, isReversed]);

  function handleReset() {
    setSortType(SortType.None);
    setIsReversed(false);
  }

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => setSortType(SortType.Alphabet)}
          type="button"
          className={
            sortType === SortType.Alphabet
              ? 'button is-info'
              : 'button is-info is-light'
          }
        >
          Sort alphabetically
        </button>

        <button
          onClick={() => setSortType(SortType.Length)}
          type="button"
          className={
            sortType === SortType.Length
              ? 'button is-success'
              : 'button is-success is-light'
          }
        >
          Sort by length
        </button>

        <button
          onClick={() => setIsReversed(currentValue => !currentValue)}
          type="button"
          className={
            isReversed ? 'button is-warning' : 'button is-warning is-light'
          }
        >
          Reverse
        </button>

        {isChanged && (
          <button
            onClick={handleReset}
            type="button"
            className="button is-danger is-light"
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {visibleItems.map(good => (
          <li data-cy="Good" key={good}>
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
