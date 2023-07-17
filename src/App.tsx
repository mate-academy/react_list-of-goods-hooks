import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
import cn from 'classnames';

const goodsFromServer: string[] = [
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

enum SortBy {
  Alfabet = 'alphabet',
  Length = 'length',
  Default = 'Default',
}

const sortAlphabet = (a: string, b: string, direction: boolean) => {
  return direction
    ? a.localeCompare(b)
    : b.localeCompare(a);
};

const sortByLenght = (a: string, b: string, direction: boolean) => {
  if (a.length === b.length) {
    return sortAlphabet(a, b, direction);
  }

  return direction
    ? a.length - b.length
    : b.length - a.length;
};

function getSortGoods(
  goods: string[],
  sortField: SortBy,
  sortDirection: boolean,
) {
  const preparedGoods: string[] = [...goods];

  if (sortField) {
    preparedGoods.sort((good1, good2) => {
      switch (sortField) {
        case SortBy.Alfabet:
          return sortAlphabet(good1, good2, sortDirection);

        case SortBy.Length:
          return sortByLenght(good1, good2, sortDirection);

        case SortBy.Default:
          return !sortDirection
            ? preparedGoods.indexOf(good2) - preparedGoods.indexOf(good1)
            : 0;

        default:
          return 0;
      }
    });
  }

  return preparedGoods;
}

export const App: React.FC = () => {
  const [sortField, setSortField] = useState(SortBy.Default);
  const [isReversed, setIsReversed] = useState(true);
  const sortGoods = getSortGoods(goodsFromServer, sortField, isReversed);
  const sortReverse = () => {
    if (isReversed === true) {
      setIsReversed(false);

      if (sortField === SortBy.Default) {
        setIsReversed(false);
      }
    } else {
      setIsReversed(true);
    }
  };

  const resetSorting = () => {
    setSortField(SortBy.Default);
    setIsReversed(true);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => {
            setSortField(SortBy.Alfabet);
          }}
          type="button"
          className={cn('button is-info', {
            'is-light': sortField !== SortBy.Alfabet,
          })}
        >
          Sort alphabetically
        </button>

        <button
          onClick={() => {
            setSortField(SortBy.Length);
          }}
          type="button"
          className={cn('button is-success', {
            'is-light': sortField !== SortBy.Length,
          })}
        >
          Sort by length
        </button>

        <button
          onClick={sortReverse}
          type="button"
          className={cn('button is-warning', {
            'is-light': isReversed,
          })}
        >
          Reverse
        </button>

        {(sortField !== SortBy.Default || !isReversed) && (
          <button
            onClick={resetSorting}
            type="button"
            className="button is-danger is-light"
          >
            Reset
          </button>
        )}
      </div>
      <ul>
        {sortGoods.map((good) => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
