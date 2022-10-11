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
      visibleGoods = visibleGoods.sort((a, b) => a.localeCompare(b));
      break;

    case SortType.LENGTH:
      visibleGoods = visibleGoods.sort((a, b) => a.length - b.length);
      break;

    default:
      //
  }

  if (isReversed) {
    return visibleGoods.reverse();
  }

  return visibleGoods;
}

export const App: React.FC = () => {
  const [appState, setAppState] = React.useState({
    sortType: SortType.NONE,
    isReversed: false,
  });

  const handelSortAlphbet = () => {
    setAppState(prevState => {
      return {
        ...prevState,
        sortType: SortType.ALPABET,
      };
    });
  };

  const handelSortLength = () => {
    setAppState(prevState => {
      return {
        ...prevState,
        sortType: SortType.LENGTH,
      };
    });
  };

  const handelReverse = () => {
    setAppState((prevState) => {
      return {
        ...prevState,
        isReversed: !prevState.isReversed,
      };
    });
  };

  const handelReset = () => {
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
          className={appState.sortType === SortType.ALPABET
            ? 'button is-info'
            : 'button is-info is-light'}
          onClick={handelSortAlphbet}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={appState.sortType === SortType.LENGTH
            ? 'button is-success'
            : 'button is-success is-light'}
          onClick={handelSortLength}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={appState.isReversed
            ? 'button is-warning'
            : 'button is-warning is-light'}
          onClick={handelReverse}
        >
          Reverse
        </button>

        {(appState.isReversed || appState.sortType !== SortType.NONE) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={handelReset}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        <ul>
          {getReorderedGoods(
            goodsFromServer,
            appState,
          ).map(good => (
            <li
              key={good}
              data-cy="Good"
            >
              {good}
            </li>
          ))}
        </ul>
      </ul>
    </div>
  );
};
