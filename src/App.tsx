import React, { useMemo } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
import classNames from 'classnames';

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
      return isReversed ? visibleGoods.reverse() : visibleGoods;
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
      if (prevState.sortType !== SortType.ALPABET) {
        return {
          ...prevState,
          sortType: SortType.ALPABET,
        };
      }

      return prevState;
    });
  };

  const handelSortLength = () => {
    setAppState(prevState => {
      if (prevState.sortType !== SortType.LENGTH) {
        return {
          ...prevState,
          sortType: SortType.LENGTH,
        };
      }

      return prevState;
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

  const isReset = appState.isReversed || appState.sortType !== SortType.NONE;

  const reorderGoods = useMemo(
    () => {
      return getReorderedGoods(
        goodsFromServer,
        appState,
      );
    },
    [goodsFromServer, appState],
  );

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={classNames(
            'button is-info',
            {
              'is-light': appState.sortType !== SortType.ALPABET,
            },
          )}
          onClick={handelSortAlphbet}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={classNames(
            'button is-success',
            {
              'is-light': appState.sortType !== SortType.LENGTH,
            },
          )}
          onClick={handelSortLength}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={classNames(
            'button is-warning',
            {
              'is-light': !appState.isReversed,
            },
          )}
          onClick={handelReverse}
        >
          Reverse
        </button>

        {isReset && (
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
          {reorderGoods.map(good => (
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
