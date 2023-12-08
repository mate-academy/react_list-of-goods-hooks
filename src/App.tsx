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
  const sign = isReversed === false ? 1 : -1;

  visibleGoods.sort((good1, good2) => {
    switch (sortType) {
      case SortType.ALPHABET:
        return sign * (good1.localeCompare(good2));
      case SortType.LENGTH:
        return sign * (good1.length - good2.length
          + 0.1 * (good1.localeCompare(good2) > 0 ? 1 : -1));
      case SortType.NONE:
        return sign * (goodsFromServer.indexOf(good1)
                  - goodsFromServer.indexOf(good2));
      default:
        return 0;
    }
  });

  return visibleGoods;
}

export const App = () => {
  const [state, setState] = useState({
    sortType: SortType.NONE,
    isReversed: false,
  });

  const handleSortClick = (sortType: SortType) => {
    const { isReversed } = state;

    setState({ sortType, isReversed });
  };

  const handleReverseClick = () => {
    const { sortType, isReversed } = state;

    setState({ sortType, isReversed: !isReversed });
  };

  const { sortType, isReversed } = state;

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={sortType === SortType.ALPHABET
            ? 'button is-info' : 'button is-info is-light'}
          onClick={() => handleSortClick(SortType.ALPHABET)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={sortType === SortType.LENGTH
            ? 'button is-success' : 'button is-success is-light'}
          onClick={() => handleSortClick(SortType.LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={isReversed === true
            ? 'button is-warning' : 'button is-warning is-light'}
          onClick={() => handleReverseClick()}
        >
          Reverse
        </button>

        {!(sortType === SortType.NONE
            && isReversed === false)
          && (
            <button
              type="button"
              className="button is-danger is-light"
              onClick={() => setState(
                {
                  isReversed: false,
                  sortType: SortType.NONE,
                },
              )}
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
