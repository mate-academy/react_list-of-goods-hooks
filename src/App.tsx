import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';

export const goodsFromServer: string[] = [
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

interface ReorderOptions {
  sortType: SortType;
  isReversed: boolean;
}

function getReorderedGoods(goods: string[],
  { sortType, isReversed }: ReorderOptions) {
  const visibleGoods = [...goods];

  visibleGoods.sort((good1: string, good2: string): number => {
    if (sortType === SortType.ALPHABET) {
      return good1.localeCompare(good2);
    }

    if (sortType === SortType.LENGTH) {
      return good1.length - good2.length;
    }

    return 0;
  });

  if (isReversed) {
    visibleGoods.reverse();
  }

  return visibleGoods;
}

export const App: React.FC = () => {
  const [state, setState] = useState<ReorderOptions>({
    isReversed: false,
    sortType: SortType.NONE,
  });

  const sort = (sortType: SortType) => {
    setState((prevState) => ({
      ...prevState,
      sortType,
    }));
  };

  const reverse = () => {
    setState((prevState) => ({
      ...prevState,
      isReversed: !prevState.isReversed,
    }));
  };

  const reset = () => {
    setState({
      isReversed: false,
      sortType: SortType.NONE,
    });
  };

  const goods = getReorderedGoods(goodsFromServer, state);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${
            state.sortType !== SortType.ALPHABET ? 'is-light' : ''
          }`}
          onClick={() => sort(SortType.ALPHABET)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${
            state.sortType !== SortType.LENGTH ? 'is-light' : ''
          }`}
          onClick={() => sort(SortType.LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${
            !state.isReversed ? 'is-light' : ''
          }`}
          onClick={reverse}
        >
          Reverse
        </button>
        {(state.sortType !== SortType.NONE || state.isReversed) && (
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
        {goods.map((good) => (
          <li data-cy="Good" key={good}>
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
