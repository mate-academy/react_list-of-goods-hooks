import 'bulma/css/bulma.css';
import './App.scss';
import classNames from 'classnames';
import React, { useState } from 'react';

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
    visibleGoods.sort(
      (goodA, goodB) => goodA.localeCompare(goodB),
    );
  } else if (sortType === SortType.LENGTH) {
    visibleGoods.sort(
      (goodA, goodB) => goodA.length - goodB.length,
    );
  }

  if (isReversed) {
    visibleGoods.reverse();
  }

  return visibleGoods;
}

type State = {
  isReversed: boolean,
  sortType: SortType,
};

export const App: React.FC = () => {
  const [state, setState] = useState<State>({
    isReversed: false,
    sortType: SortType.NONE,
  });

  const sortAlphabet = () => {
    setState({
      ...state,
      sortType: SortType.ALPHABET,
    });
  };

  const sortLength = () => {
    setState({
      ...state,
      sortType: SortType.LENGTH,
    });
  };

  const sortReset = () => {
    setState({
      sortType: SortType.NONE,
      isReversed: false,
    });
  };

  const sortReversed = () => {
    setState({
      ...state,
      isReversed: !state.isReversed,
    });
  };

  const list = getReorderedGoods(goodsFromServer, state);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={classNames(
            'button',
            'is-info',
            { 'is-light': state.sortType !== SortType.ALPHABET },
          )}
          onClick={sortAlphabet}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={classNames(
            'button',
            'is-success',
            { 'is-light': state.sortType !== SortType.LENGTH },
          )}
          onClick={sortLength}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={classNames(
            'button',
            'is-warning',
            { 'is-light': !state.isReversed },
          )}
          onClick={sortReversed}
        >
          Reverse
        </button>

        {(state.sortType || state.isReversed) && (
          <button
            type="button"
            className="button is-danger"
            onClick={sortReset}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        <ul>
          {list.map(good => (
            <li
              data-cy="Good"
              key={good}
            >
              {good}
            </li>
          ))}
        </ul>
      </ul>
    </div>
  );
};
