import React from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
import { useState } from 'react';

enum SortType {
  alphabet = 'alphabet',
  byLength = 'byLength',
  empty = '',
}

type SortingType = { sortedBy: SortType; reversed: boolean };

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

function sortGoods(goods: string[], sortType: SortingType) {
  const sortedGoods = [...goods];

  sortedGoods.sort((good1, good2) => {
    switch (sortType.sortedBy) {
      case SortType.alphabet:
        return good1.localeCompare(good2);

      case SortType.byLength:
        return good1.length - good2.length;

      default:
        return 0;
    }
  });

  if (sortType.reversed) {
    sortedGoods.reverse();
  }

  return sortedGoods;
}

export const App: React.FC = () => {
  const [sortType, setSortType] = useState<SortingType>({
    sortedBy: SortType.empty,
    reversed: false,
  });

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${sortType.sortedBy === SortType.alphabet ? '' : 'is-light'}`}
          onClick={() => {
            setSortType({
              ...sortType,
              sortedBy: SortType.alphabet,
            });
          }}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${sortType.sortedBy === SortType.byLength ? '' : 'is-light'}`}
          onClick={() => {
            setSortType({
              ...sortType,
              sortedBy: SortType.byLength,
            });
          }}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${sortType.reversed ? '' : 'is-light'}`}
          onClick={() => {
            setSortType({
              ...sortType,
              reversed: !sortType.reversed,
            });
          }}
        >
          Reverse
        </button>

        {(sortType.reversed || sortType.sortedBy !== SortType.empty) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setSortType({
                ...sortType,
                sortedBy: SortType.empty,
                reversed: false,
              });
            }}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {sortGoods(goodsFromServer, sortType).map(good => (
          <li data-cy="Good" key={good}>
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
