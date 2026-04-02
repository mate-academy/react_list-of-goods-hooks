import React, { useState } from 'react';
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
  'Default',
  'Alphabetically',
  'Length',
}

type SortOptions = {
  sortField?: SortType;
  reverse?: boolean;
};

function getSortedGoods(goods: string[], { sortField, reverse }: SortOptions = {}) {
  let sortedGoods = [...goods];

  if (sortField !== undefined) {
    sortedGoods.sort((good1, good2) => {
      switch (sortField) {
        case SortType.Alphabetically:
          return good1.localeCompare(good2);

        case SortType.Length:
          return good1.length - good2.length;

        case SortType.Default:
        default:
          return 0;
      }
    });
  }

  if (reverse) {
    sortedGoods = sortedGoods.reverse();
  }

  return sortedGoods;
}

export const App: React.FC = () => {
  const [sortField, setSortField] = useState<SortType>(SortType.Default);
    const [isReversed, setIsReversed] = useState(false);
    const listOfGoods = getSortedGoods(goodsFromServer, {
      sortField,
      reverse: isReversed,
    });
  const isVisible = sortField !== SortType.Default || isReversed;

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${
            sortField === SortType.Alphabetically ? '' : 'is-light'
          }`}
          onClick={() => setSortField(SortType.Alphabetically)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${
            sortField === SortType.Length ? '' : 'is-light'
          }`}
          onClick={() => setSortField(SortType.Length)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${isReversed ? '' : 'is-light'}`}
          onClick={() => setIsReversed(prev => !prev)}
        >
          Reverse
        </button>

        {isVisible && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setSortField(SortType.Default);
              setIsReversed(false);
            }}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {listOfGoods.map(good => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
