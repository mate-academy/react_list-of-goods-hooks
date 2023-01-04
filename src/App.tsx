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

export const App: React.FC = () => {
  const [onReverse, handleReverse] = useState(false);
  const [onSortType, handleSortByType] = useState(SortType.NONE);

  const reset = () => {
    handleReverse(false);
    handleSortByType(SortType.NONE);
  };

  const setSortedGoods = () => {
    const sortedGoods = [...goodsFromServer];

    sortedGoods.sort((a, b) => {
      switch (onSortType) {
        case SortType.ALPHABET:
          return a.localeCompare(b);
        case SortType.LENGTH:
          return a.length - b.length;
        default:
          return SortType.NONE;
      }
    });

    if (onReverse) {
      sortedGoods.reverse();
    }

    return sortedGoods;
  };

  const visibleGoods = setSortedGoods();
  const checkArray = JSON.stringify(visibleGoods)
    !== JSON.stringify(goodsFromServer);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${onSortType !== SortType.ALPHABET ? 'is-light' : ''}`}
          onClick={() => {
            handleSortByType(SortType.ALPHABET);
          }}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${onSortType !== SortType.LENGTH ? 'is-light' : ''}`}
          onClick={() => {
            handleSortByType(SortType.LENGTH);
          }}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${!onReverse ? 'is-light' : ''}`}
          onClick={() => {
            handleReverse(!onReverse);
          }}
        >
          Reverse
        </button>
        {
          checkArray ? (
            <button
              type="button"
              className="button is-danger is-light"
              onClick={reset}
            >
              Reset
            </button>
          ) : <div />
        }
      </div>

      <ul>
        <ul>
          {
            visibleGoods.map((good) => (
              <li key={good} data-cy="Good">{good}</li>
            ))
          }
        </ul>
      </ul>
    </div>
  );
};
