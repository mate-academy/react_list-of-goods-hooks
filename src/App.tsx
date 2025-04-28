import { useState } from 'react';
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

type Goods = string[];

interface SortParameters {
  sortField: SortType;
  sortDirection: SortDirection;
}

enum SortType {
  abc = 'abc',
  length = 'length',
  default = '',
}

enum SortDirection {
  asc = 'asc',
  desc = 'desc',
}

function sortGoods(goods: Goods, { sortField, sortDirection }: SortParameters) {
  const preparedGoods = [...goods];

  if (sortField) {
    preparedGoods.sort((a, b) => {
      switch (sortField) {
        case SortType.abc:
          return a.localeCompare(b);
        case SortType.length:
          return a.length - b.length;
        default:
          return 0;
      }
    });
  }

  if (sortDirection === SortDirection.desc) {
    preparedGoods.reverse();
  }

  return preparedGoods;
}

export const App: React.FC = () => {
  const [sortField, setSortField] = useState<SortType>(SortType.default);
  const [sortDirection, setSortDirection] = useState<SortDirection>(
    SortDirection.asc,
  );
  const goods = sortGoods(goodsFromServer, { sortField, sortDirection });

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => setSortField(SortType.abc)}
          type="button"
          className={cn({
            'button is-info': true,
            'is-light': sortField !== SortType.abc,
          })}
        >
          Sort alphabetically
        </button>

        <button
          onClick={() => setSortField(SortType.length)}
          type="button"
          className={cn({
            'button is-success': true,
            'is-light': sortField !== SortType.length,
          })}
        >
          Sort by length
        </button>

        <button
          onClick={() => {
            setSortDirection(
              sortDirection === SortDirection.asc
                ? SortDirection.desc
                : SortDirection.asc,
            );
          }}
          type="button"
          className={cn({
            'button is-warning': true,
            'is-light': sortDirection !== SortDirection.desc,
          })}
        >
          Reverse
        </button>

        {(sortField || sortDirection !== SortDirection.asc) && (
          <button
            onClick={() => {
              setSortField(SortType.default);
              setSortDirection(SortDirection.asc);
            }}
            type="button"
            className={cn({
              'button is-danger': true,
              'is-light': sortDirection !== SortDirection.desc,
            })}
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
