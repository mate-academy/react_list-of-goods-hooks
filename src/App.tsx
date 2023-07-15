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

enum SortFields {
  byAlfabet = 'alphabet',
  byLength = 'length',
  byIndexdesc = 'reverse default',
  default = 'default',
}

enum SortDirections {
  byAsc = 'asc',
  byDesc = 'desc',
}

const sortByAlfabet = (a: string, b: string, direction: SortDirections) => {
  return direction === SortDirections.byAsc
    ? a.localeCompare(b)
    : b.localeCompare(a);
};

const sortByLenght = (a: string, b: string, direction: SortDirections) => {
  if (a.length === b.length) {
    return sortByAlfabet(a, b, direction);
  }

  return direction === SortDirections.byAsc
    ? a.length - b.length
    : b.length - a.length;
};

function getSortGoods(
  goods: string[],
  sortField: SortFields,
  sortDirection: SortDirections,
) {
  const preparedGoods: string[] = [...goods];

  if (sortField) {
    preparedGoods.sort((good1, good2) => {
      switch (sortField) {
        case SortFields.default:
          return 0;

        case SortFields.byAlfabet:
          return sortByAlfabet(good1, good2, sortDirection);

        case SortFields.byLength:
          return sortByLenght(good1, good2, sortDirection);

        case SortFields.byIndexdesc:
          return preparedGoods.indexOf(good2) - preparedGoods.indexOf(good1);

        default:
          return 0;
      }
    });
  }

  return preparedGoods;
}

export const App: React.FC = () => {
  const [sortField, setSortField] = useState(SortFields.default);
  const [sortDirection, setSortDirection] = useState(SortDirections.byAsc);
  const sortGoods = getSortGoods(goodsFromServer, sortField, sortDirection);
  const sortReverse = () => {
    if (sortDirection === SortDirections.byAsc) {
      setSortDirection(SortDirections.byDesc);

      if (sortField === SortFields.default) {
        setSortField(SortFields.byIndexdesc);
      }
    } else {
      setSortDirection(SortDirections.byAsc);

      if (sortField === SortFields.byIndexdesc) {
        setSortField(SortFields.default);
      } else if (sortField === SortFields.default) {
        setSortField(SortFields.byIndexdesc);
      }
    }
  };

  const resetSorting = () => {
    setSortField(SortFields.default);
    setSortDirection(SortDirections.byAsc);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => {
            setSortField(SortFields.byAlfabet);
          }}
          type="button"
          className={cn('button is-info', {
            'is-light': sortField !== SortFields.byAlfabet,
          })}
        >
          Sort alphabetically
        </button>

        <button
          onClick={() => {
            setSortField(SortFields.byLength);
          }}
          type="button"
          className={cn('button is-success', {
            'is-light': sortField !== SortFields.byLength,
          })}
        >
          Sort by length
        </button>

        <button
          onClick={() => sortReverse()}
          type="button"
          className={cn('button is-warning', {
            'is-light': sortDirection === SortDirections.byAsc,
          })}
        >
          Reverse
        </button>

        {sortField !== SortFields.default && (
          <button
            onClick={() => {
              resetSorting();
            }}
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
