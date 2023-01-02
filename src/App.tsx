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
  const [isReverse, setIsReverseAction] = useState(false);
  const [sortType, setSortTypeAction] = useState(SortType.NONE);

  const alphabet = () => {
    setSortTypeAction(SortType.ALPHABET);
  };

  const length = () => {
    setSortTypeAction(SortType.LENGTH);
  };

  const reverse = () => {
    setIsReverseAction(!isReverse);
  };

  const reset = () => {
    setIsReverseAction(false);
    setSortTypeAction(SortType.NONE);
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

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${SortType.ALPHABET ? 'is-light' : ''}`}
          onClick={alphabet}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${SortType.LENGTH ? 'is-light' : ''}`}
          onClick={length}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${!isReverse ? 'is-light' : ''}`}
          onClick={reverse}
        >
          Reverse
        </button>
        {
          JSON.stringify(visibleGoods) !== JSON.stringify(goodsFromServer)
            ? (
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
