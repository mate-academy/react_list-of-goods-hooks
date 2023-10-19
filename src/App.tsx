import 'bulma/css/bulma.css';
import './App.scss';
import React, { useState } from 'react';
import cn from 'classnames';

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
  Alphabetically = 'Sort alphabetically',
  Length = 'Sort by length',
  Null = '',
  Reverse = 'Reverse',
}

interface Buttons {
  sortType: SortType,
  buttonStyle: string,
}

const buttons: Buttons[] = [
  { sortType: SortType.Alphabetically, buttonStyle: 'is-info' },
  { sortType: SortType.Length, buttonStyle: 'is-success' },
  { sortType: SortType.Reverse, buttonStyle: 'is-warning' },
];

const sortByParams = (
  toSortArray: string[],
  sortType: SortType,
  isReversed: boolean,
): string[] => {
  const arrayCopy: string[] = [...toSortArray];

  if (sortType) {
    arrayCopy.sort((a: string, b: string) => {
      switch (sortType) {
        case SortType.Alphabetically:
          return a.localeCompare(b);

        case SortType.Length:
          return a.length - b.length;

        default:
          return 0;
      }
    });
  }

  return isReversed ? arrayCopy.reverse() : arrayCopy;
};

export const App: React.FC = () => {
  const [sortType, setSortType] = useState<SortType>(SortType.Null);
  const [isReversed, setIsReversed] = useState<boolean>(false);

  function reset(): void {
    setSortType(SortType.Null);
    setIsReversed(false);
  }

  const sortedGoods: string[] = sortByParams(
    goodsFromServer,
    sortType,
    isReversed,
  );

  const isSorted: boolean = (Boolean(sortType) || isReversed);

  return (
    <div className="section content">
      <div className="buttons">
        {buttons.map((button: Buttons) => (
          <button
            onClick={() => (
              button.sortType === SortType.Reverse
                ? setIsReversed(!isReversed)
                : setSortType(button.sortType)
            )}
            type="button"
            className={
              cn(
                'button',
                button.buttonStyle,
                {
                  'is-light': button.sortType === SortType.Reverse
                    ? !isReversed
                    : button.sortType !== sortType,
                },
              )
            }
          >
            {button.sortType}
          </button>
        ))}

        {isSorted
          && (
            <button
              onClick={reset}
              type="button"
              className="button is-danger is-light"
            >
              Reset
            </button>
          )}
      </div>

      <ul>
        {sortedGoods.map((good: string) => (
          <li data-cy="Good" key={good}>
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
