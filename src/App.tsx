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
  Indexdesc = 'reverse Default',
  Default = 'Default',
}

enum SortDirections {
  Asc = 'asc',
  Desc = 'desc',
}

const sortAlfabet = (a: string, b: string, direction: SortDirections) => {
  return direction === SortDirections.Asc
    ? a.localeCompare(b)
    : b.localeCompare(a);
};

const sortByLenght = (a: string, b: string, direction: SortDirections) => {
  if (a.length === b.length) {
    return sortAlfabet(a, b, direction);
  }

  return direction === SortDirections.Asc
    ? a.length - b.length
    : b.length - a.length;
};

function getSortGoods(
  goods: string[],
  sortField: SortBy,
  sortDirection: SortDirections,
) {
  const preparedGoods: string[] = [...goods];

  if (sortField) {
    preparedGoods.sort((good1, good2) => {
      switch (sortField) {
        case SortBy.Alfabet:
          return sortAlfabet(good1, good2, sortDirection);

        case SortBy.Length:
          return sortByLenght(good1, good2, sortDirection);

        case SortBy.Indexdesc:
          return preparedGoods.indexOf(good2) - preparedGoods.indexOf(good1);
        default:
          return 0;
      }
    });
  }

  return preparedGoods;
}

export const App: React.FC = () => {
  const [sortField, setSortField] = useState(SortBy.Default);
  const [sortDirection, setSortDirection] = useState(SortDirections.Asc);
  const sortGoods = getSortGoods(goodsFromServer, sortField, sortDirection);
  const sortReverse = () => {
    if (sortDirection === SortDirections.Asc) {
      setSortDirection(SortDirections.Desc);

      if (sortField === SortBy.Default) {
        setSortField(SortBy.Indexdesc);
      }
    } else {
      setSortDirection(SortDirections.Asc);

      if (sortField === SortBy.Indexdesc) {
        setSortField(SortBy.Default);
      } else if (sortField === SortBy.Default) {
        setSortField(SortBy.Indexdesc);
      }
    }
  };

  const resetSorting = () => {
    setSortField(SortBy.Default);
    setSortDirection(SortDirections.Asc);
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
          onClick={() => sortReverse()}
          type="button"
          className={cn('button is-warning', {
            'is-light': sortDirection === SortDirections.Asc,
          })}
        >
          Reverse
        </button>

        {sortField !== SortBy.Default && (
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
