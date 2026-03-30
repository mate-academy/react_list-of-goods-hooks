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
  NONE = 'NONE',
  ALPHABET = 'ALPHABET',
  LENGTH = 'LENGTH',
}

export const App: React.FC = () => {
  const [goods] = useState<string[]>(goodsFromServer);
  const [sortType, setSortType] = useState<SortType>(SortType.NONE);
  const [isReversed, setIsReversed] = useState(false);

  const visibleGoods = useMemo(() => {
    const preparedGoods = [...goods];

    if (sortType === SortType.ALPHABET) {
      preparedGoods.sort((a, b) => a.localeCompare(b));
    }

    if (sortType === SortType.LENGTH) {
      preparedGoods.sort((a, b) => a.length - b.length);
    }

    if (isReversed) {
      preparedGoods.reverse();
    }

    return preparedGoods;
  }, [goods, sortType, isReversed]);

  const handleReset = () => {
    setSortType(SortType.NONE);
    setIsReversed(false);
  };

  const isModified = sortType !== SortType.NONE || isReversed;

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${
            sortType !== SortType.ALPHABET ? 'is-light' : ''
          }`}
          onClick={() => setSortType(SortType.ALPHABET)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${
            sortType !== SortType.LENGTH ? 'is-light' : ''
          }`}
          onClick={() => setSortType(SortType.LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${!isReversed ? 'is-light' : ''}`}
          onClick={() => setIsReversed(prev => !prev)}
        >
          Reverse
        </button>

        {isModified && (
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
