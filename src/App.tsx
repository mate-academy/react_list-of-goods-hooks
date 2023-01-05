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
  const [isReverse, setIsReverse] = useState(false);
  const [sortType, setSortByType] = useState(SortType.NONE);

  const reset = () => {
    setIsReverse(false);
    setSortByType(SortType.NONE);
  };

  const setSortedGoods = () => {
    const sortedGoods = [...goodsFromServer];

    sortedGoods.sort((a, b) => {
      switch (sortType) {
        case SortType.ALPHABET:
          return a.localeCompare(b);
        case SortType.LENGTH:
          return a.length - b.length;
        default:
          return SortType.NONE;
      }
    });

    if (isReverse) {
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
          className={`button is-info ${sortType !== SortType.ALPHABET ? 'is-light' : ''}`}
          onClick={() => {
            setSortByType(SortType.ALPHABET);
          }}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${sortType !== SortType.LENGTH ? 'is-light' : ''}`}
          onClick={() => {
            setSortByType(SortType.LENGTH);
          }}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${!isReverse ? 'is-light' : ''}`}
          onClick={() => {
            setIsReverse(!isReverse);
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
