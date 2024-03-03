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
  // To avoid the original array mutation
  let visibleGoods = [...goods];

  if (sortType === SortType.ALPHABET) {
    visibleGoods = visibleGoods.sort((a, b) => {
      return a.localeCompare(b);
    });
  }

  if (sortType === SortType.LENGTH) {
    visibleGoods = visibleGoods.sort((a, b) => {
      return a.length - b.length;
    });
  }

  if (isReversed) {
    visibleGoods = visibleGoods.reverse();
  }

  return visibleGoods;
}

export const App: React.FC = () => {
  const [state, setState] = useState({
    isReversed: false,
    sortType: SortType.NONE,
  });

  const { isReversed, sortType } = state;

  const goods = getReorderedGoods(goodsFromServer, state);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${sortType !== SortType.ALPHABET ? 'is-light' : ''}`}
          onClick={() => {
            setState({ ...state, sortType: SortType.ALPHABET });
          }}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${sortType !== SortType.LENGTH ? 'is-light' : ''}`}
          onClick={() => {
            setState({ ...state, sortType: SortType.LENGTH });
          }}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${!isReversed ? 'is-light' : ''}`}
          onClick={() => {
            setState(oldState => {
              return { ...oldState, isReversed: !oldState.isReversed };
            });
          }}
        >
          Reverse
        </button>

        {(sortType !== SortType.NONE || isReversed) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setState({
                isReversed: false,
                sortType: SortType.NONE,
              });
            }}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        <ul>
          {goods.map(product => {
            return (
              <li key={product} data-cy="Good">
                {product}
              </li>
            );
          })}
        </ul>
      </ul>
    </div>
  );
};
