import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
import cn from 'classnames';

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

export function getReorderedGoods(
  goods: string[], sortType: SortType, isReversed: boolean,
) {
  // To avoid the original array mutation
  const visibleGoods = [...goods];

  switch (sortType) {
    case SortType.ALPHABET:
      visibleGoods.sort((good1, good2) => good1.localeCompare(good2));
      break;
    case SortType.LENGTH:
      visibleGoods.sort((good1, good2) => good1.length - good2.length);
      break;
    default:
      break;
  }

  if (isReversed) {
    visibleGoods.reverse();
  }

  return visibleGoods;
}

export const App: React.FC = () => {
  const [sortType, setSortType] = useState(SortType.NONE);
  const [isReversed, setIsReversed] = useState(false);

  const handleClickReverse = () => {
    setIsReversed(current => !current);
  };

  const handleClickSortByLength = () => {
    setSortType(SortType.LENGTH);
  };

  const handleClickSortAlphabetically = () => {
    setSortType(SortType.ALPHABET);
  };

  const handleClickReset = () => {
    setSortType(SortType.NONE);
    setIsReversed(false);
  };

  const isResetVisible = isReversed || sortType !== SortType.NONE;
  const goodsToRender = getReorderedGoods(
    goodsFromServer,
    sortType,
    isReversed,
  );

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn(
            'button is-info',
            {
              'is-light': sortType !== SortType.ALPHABET,
            },
          )}
          onClick={handleClickSortAlphabetically}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn(
            'button is-success',
            {
              'is-light': sortType !== SortType.LENGTH,
            },
          )}
          onClick={handleClickSortByLength}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn(
            'button is-warning',
            {
              'is-light': !isReversed,
            },
          )}
          onClick={handleClickReverse}
        >
          Reverse
        </button>

        {
          (isResetVisible && (
            <button
              type="button"
              className="button is-warning is-light"
              onClick={handleClickReset}
            >
              Reset
            </button>
          ))
        }
      </div>

      <ul>
        <ul>
          {goodsToRender.map(good => (
            <li
              data-cy="Good"
              key={good}
              className={cn(
                {
                  SortByLength: sortType === SortType.LENGTH,
                  SortAlphabetically: sortType === SortType.ALPHABET,
                  Reverse: isReversed,
                },
              )}
            >
              {good}
            </li>
          ))}
        </ul>
      </ul>
    </div>
  );
};
