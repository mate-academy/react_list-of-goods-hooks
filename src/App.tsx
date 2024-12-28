import React, { useState } from 'react';
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
  DEFAULT = 'default',
  ALPHABET = 'alphabet',
  LENGTH = 'length',
}

const getPreparedGoods = (
  goods: string[],
  sortField: SortType,
  isReverse: boolean,
): string[] => {
  const sortedGoods = [...goods].sort((good1, good2) => {
    switch (sortField) {
      case SortType.ALPHABET:
        return good1.localeCompare(good2);
      case SortType.LENGTH:
        return good1.length - good2.length;
      default:
        return 0;
    }
  });

  return isReverse ? sortedGoods.reverse() : sortedGoods;
};

export const App: React.FC = () => {
  const [sortField, setSortField] = useState(SortType.DEFAULT);
  const [isReverse, setIsReverse] = useState(false);

  const goods = getPreparedGoods(goodsFromServer, sortField, isReverse);

  const handleReset = () => {
    setSortField(SortType.DEFAULT);
    setIsReverse(false);
  };

  const isModified = sortField !== SortType.DEFAULT || isReverse;

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${sortField !== SortType.ALPHABET ? 'is-light' : ''}`}
          onClick={() => setSortField(SortType.ALPHABET)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${sortField !== SortType.LENGTH ? 'is-light' : ''}`}
          onClick={() => setSortField(SortType.LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${!isReverse ? 'is-light' : ''}`}
          onClick={() => setIsReverse(!isReverse)}
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
        {goods.map(good => (
          <li data-cy="Good" key={good}>
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
