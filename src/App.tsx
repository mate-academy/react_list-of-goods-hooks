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
  NONE,
  ALPHABET,
  LENGTH,
}

type SortOptions = {
  sortType: SortType,
  reverse: boolean,
};

export function getPreparedGoods(
  goods: string[],
  { sortType, reverse }: SortOptions,
) {
  const preparedGoods = [...goods];

  if (sortType) {
    preparedGoods.sort((good1, good2) => {
      switch (sortType) {
        case SortType.ALPHABET:
          return good1.localeCompare(good2);

        case SortType.LENGTH:
          return good1.length - good2.length;

        default:
          return SortType.NONE;
      }
    });
  }

  if (reverse) {
    preparedGoods.reverse();
  }

  return preparedGoods;
}

export const App: React.FC = () => {
  const [sortType, setSortField] = useState(SortType.NONE);
  const [reverse, setSortReverse] = useState(false);
  const visibleGoods = getPreparedGoods(
    goodsFromServer, { sortType, reverse },
  );

  const reset = () => {
    setSortField(SortType.NONE);
    setSortReverse(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${sortType !== SortType.ALPHABET && 'is-light'}`}
          onClick={() => {
            setSortField(SortType.ALPHABET);
          }}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${sortType !== SortType.LENGTH && 'is-light'}`}
          onClick={() => {
            setSortField(SortType.LENGTH);
          }}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${!reverse && 'is-light'}`}
          onClick={() => {
            setSortReverse(!reverse);
          }}
        >
          Reverse
        </button>

        {(sortType || reverse) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={reset}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {visibleGoods.map(good => (
          <li
            data-cy="Good"
            key={good}
          >
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
