import React from 'react';
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

export enum SortType {
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
): string[] {
  const visibleGoods = [...goods];

  if (sortType === SortType.ALPHABET) {
    visibleGoods.sort((a, b) => a.localeCompare(b));
  }

  if (sortType === SortType.LENGTH) {
    visibleGoods.sort((a, b) => a.length - b.length);
  }

  if (isReversed) {
    visibleGoods.reverse();
  }

  return visibleGoods;
}

type State = {
  sortType: SortType;
  isReversed: boolean;
};

export const App: React.FC = () => {
  const [state, setState] = React.useState<State>({
    sortType: SortType.NONE,
    isReversed: false,
  });

  const { sortType, isReversed } = state;

  const visibleGoods = getReorderedGoods(goodsFromServer, {
    sortType,
    isReversed,
  });

  const isOriginalOrder =
    sortType === SortType.NONE && !isReversed;

  const sortAlphabetically = () => {
    setState(prevState => ({
      ...prevState,
      sortType: SortType.ALPHABET,
    }));
  };

  const sortByLength = () => {
    setState(prevState => ({
      ...prevState,
      sortType: SortType.LENGTH,
    }));
  };

  const reverse = () => {
    setState(prevState => ({
      ...prevState,
      isReversed: !prevState.isReversed,
    }));
  };

  const reset = () => {
    setState({
      sortType: SortType.NONE,
      isReversed: false,
    });
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${
            sortType === SortType.ALPHABET ? '' : 'is-light'
          }`}
          onClick={sortAlphabetically}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${
            sortType === SortType.LENGTH ? '' : 'is-light'
          }`}
          onClick={sortByLength}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${
            isReversed ? '' : 'is-light'
          }`}
          onClick={reverse}
        >
          Reverse
        </button>

        {!isOriginalOrder && (
          <button type="button" className="button is-danger" onClick={reset}>
            Reset
          </button>
        )}
      </div>

      <ul>
        {visibleGoods.map(good => (
          <li data-cy="Good" key={good}>
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
