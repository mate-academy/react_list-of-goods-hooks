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

type ReorderOptions = {
  sortType: SortType,
  isReversed: boolean,
};

export function getReorderedGoods(
  goods: string[],
  { sortType, isReversed }: ReorderOptions,
) {
  const visibleGoods = [...goods];

  switch (sortType) {
    case SortType.NONE:
      break;

    case SortType.ALPHABET:
      visibleGoods.sort((goodA, goodB) => {
        return goodA.localeCompare(goodB);
      });
      break;

    case SortType.LENGTH:
      visibleGoods.sort((goodA, goodB) => {
        return goodA.length - goodB.length;
      });
      break;

    default:
      throw Error('Unknown sortType');
  }

  if (isReversed) {
    visibleGoods.reverse();
  }

  return visibleGoods;
}

export const App: React.FC = () => {
  const [sortType, setSortType] = useState(SortType.NONE);
  const [isReversed, setIsReveresed] = useState(false);
  const startOrder = sortType === SortType.NONE && !isReversed;

  const goods = getReorderedGoods(goodsFromServer, { sortType, isReversed });

  const reverse = () => {
    setIsReveresed(!isReversed);
  };

  const sortAlphabetically = () => {
    setSortType(SortType.ALPHABET);
  };

  const sortByLength = () => {
    setSortType(SortType.LENGTH);
  };

  const reset = () => {
    setSortType(SortType.NONE);
    setIsReveresed(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          onClick={sortAlphabetically}
          className={`button is-info ${sortType === SortType.ALPHABET
            ? ''
            : 'is-light'
          }`}
        >
          Sort alphabetically
        </button>

        <button
          onClick={sortByLength}
          type="button"
          className={`button is-success ${sortType === SortType.LENGTH
            ? ''
            : 'is-light'
          }`}
        >
          Sort by length
        </button>

        <button
          onClick={reverse}
          type="button"
          className={`button is-warning ${isReversed
            ? ''
            : 'is-light'
          }`}
        >
          Reverse
        </button>

        {!startOrder && (
          <button
            onClick={reset}
            type="button"
            className="button is-danger is-light"
          >
            Reset
          </button>
        )}
      </div>
      <ul>
        {goods.map(good => (
          <li
            key={good}
            data-cy="Good"
          >
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
