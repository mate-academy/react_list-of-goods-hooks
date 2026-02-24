import React, { useState, useMemo } from 'react';

enum SortType {
  None = 'None',
  Alphabetically = 'Alphabetically',
  Length = 'Length',
}

const goods = [
  'Dumplings',
  'Carrots',
  'Tomatoes',
  'Apples',
  'Salmon',
  'Avocado',
  'Oranges',
  'Bananas',
];

export const App: React.FC = () => {
  const [sortType, setSortType] = useState<SortType>(SortType.None);
  const [isReversed, setIsReversed] = useState(false);

  const visibleGoods = useMemo(() => {
    const preparedGoods = [...goods];

    if (sortType === SortType.Alphabetically) {
      preparedGoods.sort((a, b) => a.localeCompare(b));
    }

    if (sortType === SortType.Length) {
      preparedGoods.sort((a, b) => a.length - b.length);
    }

    if (isReversed) {
      preparedGoods.reverse();
    }

    return preparedGoods;
  }, [sortType, isReversed]);

  const handleReset = () => {
    setSortType(SortType.None);
    setIsReversed(false);
  };

  return (
    <div className="app">
      <div className="buttons">
        <button
          type="button"
          onClick={() => setSortType(SortType.Alphabetically)}
          className={sortType === SortType.Alphabetically ? 'active' : ''}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          onClick={() => setSortType(SortType.Length)}
          className={sortType === SortType.Length ? 'active' : ''}
        >
          Sort by length
        </button>

        <button
          type="button"
          onClick={() => setIsReversed(prev => !prev)}
          className={isReversed ? 'active' : ''}
        >
          Reverse
        </button>

        {(sortType !== SortType.None || isReversed) && (
          <button type="button" onClick={handleReset}>
            Reset
          </button>
        )}
      </div>

      <ul>
        {visibleGoods.map(good => (
          <li key={good}>{good}</li>
        ))}
      </ul>
    </div>
  );
};
