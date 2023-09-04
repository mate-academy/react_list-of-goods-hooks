import { useState } from 'react';
import cl from 'classnames';
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
  SortByAlphabet = 'alphabet',
  SortByLength = 'length',
  DefaultValue = '',
}

interface SortingOptions {
  sortType: SortType,
  isReversed: boolean,
}

function getSortedGoodsList(
  goods: string[],
  { sortType, isReversed }: SortingOptions,
) {
  const sortedGoodList = [...goods];

  if (sortType) {
    sortedGoodList.sort((a, b) => {
      switch (sortType) {
        case SortType.SortByLength: {
          return a.length - b.length;
        }

        case SortType.SortByAlphabet: {
          return a.localeCompare(b);
        }

        default:
          return 0;
      }
    });
  }

  if (isReversed) {
    sortedGoodList.reverse();
  }

  return sortedGoodList;
}

export const App = () => {
  const [sortingOptions, setSortingOptions] = useState<SortingOptions>({
    sortType: SortType.DefaultValue,
    isReversed: false,
  });

  const visibleGoodsList = getSortedGoodsList(
    goodsFromServer,
    sortingOptions,
  );

  const handlerSetSortType = (sortType: SortType) => () => {
    setSortingOptions((prevState: SortingOptions) => ({
      ...prevState,
      sortType,
    }));
  };

  const handlerSetIsReversed = () => {
    setSortingOptions((prevState: SortingOptions) => ({
      ...prevState,
      isReversed: !prevState.isReversed,
    }));
  };

  const resetSortingOptions = () => {
    setSortingOptions({
      sortType: SortType.DefaultValue,
      isReversed: false,
    });
  };

  const isSortingOptionsInstalled = (
    sortingOptions.sortType || sortingOptions.isReversed
  );

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cl(
            'button',
            'is-info',
            { 'is-light': sortingOptions.sortType !== SortType.SortByAlphabet },
          )}
          onClick={handlerSetSortType(SortType.SortByAlphabet)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cl(
            'button',
            'is-success',
            { 'is-light': sortingOptions.sortType !== SortType.SortByLength },
          )}
          onClick={handlerSetSortType(SortType.SortByLength)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cl(
            'button',
            'is-warning',
            { 'is-light': !sortingOptions.isReversed },
          )}
          onClick={handlerSetIsReversed}
        >
          Reverse
        </button>

        {isSortingOptionsInstalled
          && (
            <button
              type="button"
              className="button is-danger is-light"
              onClick={resetSortingOptions}
            >
              Reset
            </button>
          )}
      </div>

      <ul>
        {
          visibleGoodsList.map(good => (
            <li data-cy="Good" key={good}>{good}</li>
          ))
        }
      </ul>
    </div>
  );
};
