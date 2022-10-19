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
  ALPABET,
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
  let visibleGoods = [...goods];

  switch (sortType) {
    case SortType.ALPABET:
      visibleGoods = visibleGoods.sort((g1, g2) => g1.localeCompare(g2));
      break;

    case SortType.LENGTH:
      visibleGoods = visibleGoods.sort((g1, g2) => g1.length - g2.length);
      break;

    default:
      break;
  }

  if (isReversed) {
    return visibleGoods.reverse();
  }

  return visibleGoods;
}

export const App: React.FC = () => {
  const [appState, setAppState] = useState({
    isReversed: false,
    sortType: SortType.NONE,
  });

  const sortByAlphabet = () => {
    setAppState(prevState => {
      return {
        ...prevState,
        sortType: SortType.ALPABET,
      };
    });
  };

  const sortByLength = () => {
    setAppState(prevState => {
      return {
        ...prevState,
        sortType: SortType.LENGTH,
      };
    });
  };

  const handleReverse = () => {
    setAppState(prevState => {
      return {
        ...prevState,
        isReversed: !prevState.isReversed,
      };
    });
  };

  const handleReset = () => {
    setAppState({
      isReversed: false,
      sortType: SortType.NONE,
    });
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${appState.sortType !== SortType.ALPABET && 'is-light'}`}
          onClick={sortByAlphabet}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-info ${appState.sortType !== SortType.LENGTH && 'is-light'}`}
          onClick={sortByLength}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${!appState.isReversed && 'is-light'}`}
          onClick={handleReverse}
        >
          Reverse
        </button>

        {(appState.isReversed || appState.sortType !== SortType.NONE) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={handleReset}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        <ul>
          {getReorderedGoods(goodsFromServer, appState).map(good => (
            <li key={good} data-cy="Good">
              {good}
            </li>
          ))}
        </ul>
      </ul>
    </div>
  );
};
