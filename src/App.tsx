import 'bulma/css/bulma.css';
import './App.scss';
import { useState } from 'react';
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

type Goods = string[];

interface SortParameters {
  sortField: SortType;
  sortDirection: SortDirection;
}

enum SortType {
  BY_ALPHABET = 'alpha',
  BY_LENGTH = 'length',
  DEFAULT = '',
}

enum SortDirection {
  ASCENDING = 'asc',
  DESCENDING = 'desc',
}

function sortGoods(goods: Goods, { sortField, sortDirection }: SortParameters) {
  const preparedGoods = [...goods];

  if (sortField) {
    preparedGoods.sort((a, b) => {
      switch (sortField) {
        case SortType.BY_ALPHABET:
          return a.localeCompare(b);
        case SortType.BY_LENGTH:
          return a.length - b.length;
        default:
          return 0;
      }
    });
  }

  if (sortDirection === SortDirection.DESCENDING) {
    preparedGoods.reverse();
  }

  return preparedGoods;
}

export const App = () => {
  const [sortField, setSortParameter] = useState<SortType>(SortType.DEFAULT);
  const [sortDirection, setSortDirection] = useState(SortDirection.ASCENDING);
  const goods = sortGoods(goodsFromServer, { sortField, sortDirection });

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn({
            'button is-info': true,
            'is-light': sortField !== SortType.BY_ALPHABET,
          })}
          onClick={() => setSortParameter(SortType.BY_ALPHABET)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn({
            'button is-success': true,
            'is-light': sortField !== SortType.BY_LENGTH,
          })}
          onClick={() => setSortParameter(SortType.BY_LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn({
            'button is-warning': true,
            'is-light': sortDirection !== SortDirection.DESCENDING,
          })}
          onClick={() => {
            setSortDirection(
              sortDirection === SortDirection.ASCENDING
                ? SortDirection.DESCENDING
                : SortDirection.ASCENDING,
            );
          }}
        >
          Reverse
        </button>

        {(sortField || sortDirection !== SortDirection.ASCENDING) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setSortParameter(SortType.DEFAULT);
              setSortDirection(SortDirection.ASCENDING);
            }}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {goods.map(good => (
          <li data-cy="Good" key={good}>
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
