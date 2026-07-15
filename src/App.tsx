import 'bulma/css/bulma.css';
import './App.scss';
import React, { useState } from 'react';

enum SortType {
  NONE = 'none',
  ALPHABET = 'alphabet',
  LENGTH = 'length',
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
  const [sortType, setSortType] = useState(SortType.NONE);
  const [isReversed, setIsReversed] = useState(false);

  const getGoodsSorted = () => {
    const goods = [...goodsFromServer];

    switch (sortType) {
      case SortType.ALPHABET:
        goods.sort((a, b) => a.localeCompare(b));
        break;

      case SortType.LENGTH:
        goods.sort((a, b) => a.length - b.length);
        break;

      default:
        break;
    }

    if (isReversed) {
      goods.reverse();
    }

    return goods;
  };

  const handleReset = () => {
    setSortType(SortType.NONE);
    setIsReversed(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${
            sortType === SortType.ALPHABET ? '' : 'is-light'
          }`}
          onClick={() => setSortType(SortType.ALPHABET)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${
            sortType === SortType.LENGTH ? '' : 'is-light'
          }`}
          onClick={() => setSortType(SortType.LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${
            isReversed ? '' : 'is-light'
          }`}
          onClick={() => setIsReversed(prev => !prev)}
        >
          Reverse
        </button>

        {(sortType !== SortType.NONE || isReversed) && (
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
        {getGoodsSorted().map(good => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
