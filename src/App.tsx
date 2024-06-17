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

enum SortField {
  alphabet = 'alphabet',
  length = 'length',
  default = '',
}

const getPreparedGoods = (
  goods: string[],
  { sortField, reversed }: { sortField: SortField; reversed: boolean },
) => {
  const copyGoods = [...goods];

  if (sortField !== SortField.default) {
    copyGoods.sort((good1, good2) => {
      switch (sortField) {
        case SortField.alphabet:
          return good1.localeCompare(good2);
        case SortField.length:
          return good1.length - good2.length;
        default:
          return 0;
      }
    });
  }

  if (reversed) {
    copyGoods.reverse();
  }

  return copyGoods;
};

export const App: React.FC = () => {
  const [fildSort, setFildSort] = useState(SortField.default);
  const [isReverse, setIsReverse] = useState(false);

  const visibleGoods = getPreparedGoods(goodsFromServer, {
    sortField: fildSort,
    reversed: isReverse,
  });

  const resetSort = () => {
    setFildSort(SortField.default);
    setIsReverse(false);
  };

  const reversGoods = () => {
    setIsReverse(!isReverse);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => {
            setFildSort(SortField.alphabet);
          }}
          type="button"
          className={`button is-info ${fildSort !== SortField.alphabet ? 'is-light' : ''} `}
        >
          Sort alphabetically
        </button>

        <button
          onClick={() => {
            setFildSort(SortField.length);
          }}
          type="button"
          className={`button is-success ${fildSort !== SortField.length ? 'is-light' : ''} `}
        >
          Sort by length
        </button>

        <button
          onClick={() => {
            reversGoods();
          }}
          type="button"
          className={`button is-warning ${isReverse ? '' : 'is-light'} `}
        >
          Reverse
        </button>

        {(fildSort !== SortField.default || isReverse) && (
          <button
            onClick={resetSort}
            type="button"
            className="button is-danger is-light"
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
