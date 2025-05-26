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
  Alphabetical = 'alphabetical',
  Length = 'length',
  Default = '',
}

//тренував генерики

const preparedGoodsList = <T,>(
  arr: T[],
  sortParam: SortType,
  isReversed: boolean,
): T[] => {
  const copy = [...arr];

  if (sortParam === SortType.Alphabetical) {
    copy.sort((a, b) => {
      const isAString = typeof a === 'string';
      const isBString = typeof b === 'string';

      if (isAString && isBString) {
        return a.localeCompare(b);
      }

      return 0;
    });
  }

  if (sortParam === SortType.Length) {
    copy.sort((a, b) => {
      const isAString = typeof a === 'string';
      const isBString = typeof b === 'string';

      if (isAString && isBString) {
        return a.length - b.length;
      }

      return 0;
    });
  }

  return isReversed ? copy.reverse() : copy;
};

// адекватна функція без генеріков

// const preparedGoodsList = (
//   goods: string[],
//   sortParam: SortType,
//   isReversed: boolean,
// ): string[] => {
//   const copy = [...goods];

//   if (sortParam) {
//     copy.sort((a, b) => {
//       switch (sortParam) {
//         case SortType.Alphabetical:
//           return a.localeCompare(b);

//         case SortType.Length:
//           return a.length - b.length;

//         default:
//           return 0;
//       }
//     });
//   }

//   return isReversed ? copy.reverse() : copy;
// };

export const App: React.FC = () => {
  const [sortParam, setSortParam] = useState<SortType>(SortType.Default);
  const [isReversed, setIsReversed] = useState<boolean>(false);

  const isSortAlbh = sortParam === SortType.Alphabetical;
  const isSortLength = sortParam === SortType.Length;
  const isResetButtonVisible = sortParam !== SortType.Default || isReversed;

  const handleResetButton = () => {
    setSortParam(SortType.Default);
    setIsReversed(false);
  };

  const goodsList = preparedGoodsList(goodsFromServer, sortParam, isReversed);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button', 'is-info', { 'is-light': !isSortAlbh })}
          onClick={() => setSortParam(SortType.Alphabetical)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button', 'is-success', { 'is-light': !isSortLength })}
          onClick={() => setSortParam(SortType.Length)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button', 'is-warning', { 'is-light': !isReversed })}
          onClick={() => setIsReversed(prev => !prev)}
        >
          Reverse
        </button>

        {isResetButtonVisible && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => handleResetButton()}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {goodsList.map(good => {
          return (
            <li key={good} data-cy="Good">
              {good}
            </li>
          );
        })}
      </ul>
    </div>
  );
};
