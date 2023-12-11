// import React from 'react';
import { useState } from 'react';
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
    case SortType.ALPHABET:
      visibleGoods.sort((good1, good2) => good1.localeCompare(good2));
      break;
    case SortType.LENGTH:
      visibleGoods.sort((good1, good2) => good1.length - good2.length);
      break;
    default:
      break;
  }

  // eslint-disable-next-line no-console
  console.log(sortType, isReversed);

  if (isReversed) {
    visibleGoods.reverse();
  }

  return visibleGoods;
}

export const App = () => {
  const [sortType, setSortType] = useState(SortType.NONE);

  const [isReversed, setIsReversed] = useState(false);

  const handleSortClick = (inputSortType: SortType) => () => {
    setSortType(inputSortType);
  };

  const handleReverseClick = () => () => {
    setIsReversed(!isReversed);
  };

  const handleResetClick = () => () => {
    setIsReversed(false);
    setSortType(SortType.NONE);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={sortType === SortType.ALPHABET
            ? 'button is-info' : 'button is-info is-light'}
          onClick={handleSortClick(SortType.ALPHABET)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={sortType === SortType.LENGTH
            ? 'button is-success' : 'button is-success is-light'}
          onClick={handleSortClick(SortType.LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={isReversed === true
            ? 'button is-warning' : 'button is-warning is-light'}
          onClick={handleReverseClick()}
        >
          Reverse
        </button>

        {!(sortType === SortType.NONE
            && isReversed === false)
          && (
            <button
              type="button"
              className="button is-danger is-light"
              onClick={handleResetClick()}
            >
              Reset
            </button>
          )}
      </div>

      <ul>
        <ul>
          {
            getReorderedGoods(goodsFromServer, { sortType, isReversed })
              .map((good) => (
                <li data-cy="Good">{good}</li>
              ))
          }
        </ul>
      </ul>
    </div>
  );
};
