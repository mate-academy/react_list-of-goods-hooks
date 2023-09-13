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

  if (sortType === SortType.ALPHABET) {
    visibleGoods.sort((a, b) => a.localeCompare(b));
  } else if (sortType === SortType.LENGTH) {
    visibleGoods.sort((a, b) => a.length - b.length);
  }

  if (isReversed) {
    visibleGoods.reverse();
  }

  return visibleGoods;
}

export const App: React.FC = () => {
  const [state, setState] = useState({
    isReversed: false,
    sortType: SortType.NONE,
  });

  const sort = (sortType: SortType) => () => {
    setState({
      ...state,
      sortType,
    });
  };

  const reverse = () => {
    setState({
      ...state,
      isReversed: !state.isReversed,
    });
  };

  const reset = () => {
    setState({
      sortType: SortType.NONE,
      isReversed: false,
    });
  };

  const { isReversed, sortType } = state;

  return (
    <>
      <div className="section content">
        <div className="buttons">
          <button
            type="button"
            className={
              sortType === SortType.ALPHABET
                ? 'button is-info'
                : 'button is-info is-light'
            }
            onClick={sort(SortType.ALPHABET)}
          >
            Sort alphabetically
          </button>

          <button
            type="button"
            className={
              sortType === SortType.LENGTH
                ? 'button is-info'
                : 'button is-info is-light'
            }
            onClick={sort(SortType.LENGTH)}
          >
            Sort by length
          </button>

          <button
            type="button"
            className={
              isReversed === true
                ? 'button is-info'
                : 'button is-info is-light'
            }
            onClick={reverse}
          >
            Reverse
          </button>

          {(sortType !== SortType.NONE || isReversed) && (
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
          <ul>
            {getReorderedGoods(goodsFromServer, state).map((good) => {
              return (
                <li key={good} data-cy="Good">
                  {good}
                </li>
              );
            })}
          </ul>
        </ul>
      </div>
    </>
  );
};
