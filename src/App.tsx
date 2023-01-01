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

export function getReorderedGoods(
  goods: string[],
  sortType: SortType,
  isReversed: boolean,
) {
  const visibleGoods = [...goods];

  switch (sortType) {
    case 1:
      visibleGoods.sort((g1, g2) => g1.localeCompare(g2));
      break;
    case 2:
      visibleGoods.sort((g1, g2) => g1.length - g2.length);
      break;
    default:
      break;
  }

  if (isReversed) {
    visibleGoods.reverse();
  }

  return visibleGoods;
}

export const App: React.FC = () => {
  const [isReversed, setIsReversed] = useState(false);
  const [sortType, setSortType] = useState(0);

  const neededGoods = getReorderedGoods(goodsFromServer, sortType, isReversed);

  const sortHandler = (type: SortType) => {
    setSortType(type);
  };

  const reverseHandler = () => {
    setIsReversed((prevReversed) => !prevReversed);
  };

  const resetHandler = () => {
    setSortType(0);
    setIsReversed(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${sortType !== 1 ? 'is-light' : ''}`}
          onClick={() => {
            sortHandler(1);
          }}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${sortType !== 2 ? 'is-light' : ''}`}
          onClick={() => {
            sortHandler(2);
          }}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${isReversed ? '' : 'is-light'}`}
          onClick={reverseHandler}
        >
          Reverse
        </button>

        {(sortType !== 0 || isReversed !== false) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={resetHandler}
          >
            Reset
          </button>
        )}

      </div>

      <ul>
        <ul>
          {neededGoods.map(good => <li data-cy="Good" key={good}>{good}</li>)}
        </ul>
      </ul>
    </div>
  );
};
