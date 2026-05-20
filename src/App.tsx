import React, { useState } from 'react';
import './App.scss';

enum SortType {
  NONE = 'none',
  ALPHABET = 'alphabet',
  LENGTH = 'length',
}

const goodsFromServer: string[] = [
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

function getPreparedGoods(
  goods: string[],
  sortField: SortType,
  isReversed: boolean,
): string[] {
  const preparedGoods = [...goods];

  if (sortField !== SortType.NONE) {
    preparedGoods.sort((a, b) => {
      switch (sortField) {
        case SortType.ALPHABET:
          return a.localeCompare(b);
        case SortType.LENGTH:
          return a.length - b.length;
        default:
          return 0;
      }
    });
  }

  if (isReversed) {
    preparedGoods.reverse();
  }

  return preparedGoods;
}

export const App: React.FC = () => {
  const [sortField, setSortField] = useState<SortType>(SortType.NONE);
  const [isReversed, setIsReversed] = useState(false);

  const visibleGoods = getPreparedGoods(goodsFromServer, sortField, isReversed);

  const handleReset = () => {
    setSortField(SortType.NONE);
    setIsReversed(false);
  };

  const isChanged = sortField !== SortType.NONE || isReversed;

  return (
    <div className="App">
      <h1 className="title">List of Goods</h1>

      <div className="buttons">
        <button
          type="button"
          className={`button ${sortField !== SortType.ALPHABET ? 'is-light' : ''}`}
          onClick={() => setSortField(SortType.ALPHABET)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button ${sortField !== SortType.LENGTH ? 'is-light' : ''}`}
          onClick={() => setSortField(SortType.LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button ${!isReversed ? 'is-light' : ''}`}
          onClick={() => setIsReversed(prev => !prev)}
        >
          Reverse
        </button>

        {isChanged && (
          <button type="button" className="button" onClick={handleReset}>
            Reset
          </button>
        )}
      </div>

      <ul className="goods-list">
        {visibleGoods.map(good => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
