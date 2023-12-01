import React, { useState } from 'react';
import cn from 'classnames';
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
  ByAlphabet = 'byAlphabet',
  ByLength = 'byLength',
  NoSort = '',
}

const prepeareGoods = (
  goods: string[],
  sortType: SortType,
  isReversed: boolean,
) => {
  const goodsToEdit = [...goods];

  if (sortType) {
    goodsToEdit.sort((firstGood, secondGood) => {
      switch (sortType) {
        case SortType.ByAlphabet:
          return firstGood.localeCompare(secondGood);
        case SortType.ByLength:
          return firstGood.length - secondGood.length;
        default:
          return 0;
      }
    });
  }

  if (isReversed) {
    goodsToEdit.reverse();
  }

  return goodsToEdit;
};

export const App: React.FC = () => {
  const [sortType, setSortType] = useState(SortType.NoSort);
  const [isReversed, setIsReversed] = useState(false);

  const setIsReversedToggle = () => {
    setIsReversed((prevState) => !prevState);
  };

  const resetAllFilters = (): void => {
    setSortType(SortType.NoSort);
    setIsReversed(false);
  };

  const shouldShowResetBtn = isReversed || sortType;

  const prepearedGoods = prepeareGoods(goodsFromServer, sortType, isReversed);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn(
            'button is-info',
            { 'is-light': sortType !== SortType.ByAlphabet },
          )}
          onClick={() => setSortType(SortType.ByAlphabet)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn(
            'button is-success',
            { 'is-light': sortType !== SortType.ByLength },
          )}
          onClick={() => setSortType(SortType.ByLength)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn(
            'button is-warning',
            { 'is-light': isReversed === false },
          )}
          onClick={() => setIsReversedToggle()}
        >
          Reverse
        </button>
        {shouldShowResetBtn && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => resetAllFilters()}
          >
            Reset
          </button>
        )}

      </div>

      <ul>
        <ul>
          {
            prepearedGoods.map((good: string) => (
              <li data-cy="Good" key={good}>
                {good}
              </li>
            ))
          }
        </ul>
      </ul>
    </div>
  );
};
