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
  sortType: SortType;
  isReversed: boolean;
};

export function getReorderedGoods(
  goods: string[],
  { sortType, isReversed }: ReorderOptions,
) {
  const visibleGoods = [...goods];

  switch (sortType) {
    case SortType.ALPHABET:
      visibleGoods.sort();
      break;

    case SortType.LENGTH:
      visibleGoods.sort((firstGood, secondGood) => {
        return firstGood.length - secondGood.length;
      });
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
  const [isReversed, setReversed] = useState(false);
  const [sortType, setSortType] = useState(SortType.NONE);
  const visibleGoods
    = getReorderedGoods(goodsFromServer, { isReversed, sortType });
  const isSortedByAlphabet = sortType === SortType.ALPHABET;
  const isSortedByLength = sortType === SortType.LENGTH;
  const isInitial = !isReversed && sortType === SortType.NONE;

  const setOppositeReverse = () => {
    setReversed(current => !current);
  };

  const resetAll = () => {
    setReversed(false);
    setSortType(SortType.NONE);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`
              button
              is-info
              ${isSortedByAlphabet ? '' : 'is-light'}
            `}
          onClick={() => setSortType(SortType.ALPHABET)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`
              button
              is-success
              ${isSortedByLength ? '' : 'is-light'}
            `}
          onClick={() => setSortType(SortType.LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`
              button
              is-warning
              ${isReversed ? '' : 'is-light'}
            `}
          onClick={setOppositeReverse}
        >
          Reverse
        </button>

        {!isInitial && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={resetAll}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {visibleGoods.map((good) => (
          <li key={good}>{good}</li>
        ))}
      </ul>
    </div>
  );
};
