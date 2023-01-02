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
  const [sortType, setSortType] = useState<SortType>(SortType.NONE);

  const neededGoods = getReorderedGoods(goodsFromServer, sortType, isReversed);

  const sortHandler = (type: SortType) => {
    setSortType(type);
  };

  const reverseHandler = () => {
    setIsReversed((prevReversed) => !prevReversed);
  };

  const resetHandler = () => {
    setSortType(SortType.NONE);
    setIsReversed(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${sortType !== SortType.ALPHABET ? 'is-light' : ''}`}
          onClick={() => {
            sortHandler(SortType.ALPHABET);
          }}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${sortType !== SortType.LENGTH ? 'is-light' : ''}`}
          onClick={() => {
            sortHandler(SortType.LENGTH);
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

        {(sortType !== SortType.NONE || isReversed) && (
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
