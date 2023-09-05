import React, { useState } from 'react';
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
  ByAlphabet = 'alphabet',
  ByLength = 'length',
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
        case SortType.ByLength: {
          return a.length - b.length;
        }

        case SortType.ByAlphabet: {
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

export const App: React.FC = () => {
  const [sortingOptions, setSortingOptions] = useState<SortingOptions>({
    sortType: SortType.DefaultValue,
    isReversed: false,
  });

  const sortedGoods = getSortedGoodsList(
    goodsFromServer,
    sortingOptions,
  );

  const handleSortTypeChange = (sortType: SortType) => () => {
    setSortingOptions((prevState: SortingOptions) => ({
      ...prevState,
      sortType,
    }));
  };

  const handleButtonReverse = () => {
    setSortingOptions((prevState: SortingOptions) => ({
      ...prevState,
      isReversed: !prevState.isReversed,
    }));
  };

  const handleButtonReset = () => {
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
            { 'is-light': sortingOptions.sortType !== SortType.ByAlphabet },
          )}
          onClick={handleSortTypeChange(SortType.ByAlphabet)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cl(
            'button',
            'is-success',
            { 'is-light': sortingOptions.sortType !== SortType.ByLength },
          )}
          onClick={handleSortTypeChange(SortType.ByLength)}
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
          onClick={handleButtonReverse}
        >
          Reverse
        </button>

        {isSortingOptionsInstalled
          && (
            <button
              type="button"
              className="button is-danger is-light"
              onClick={handleButtonReset}
            >
              Reset
            </button>
          )}
      </div>

      <ul>
        {
          sortedGoods.map(good => (
            <li data-cy="Good" key={good}>{good}</li>
          ))
        }
      </ul>
    </div>
  );
};
