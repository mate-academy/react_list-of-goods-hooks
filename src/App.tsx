import React, { useState } from 'react';
import classNames from 'classnames';
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

enum SortBy {
  Alphabetically = 'alphabetically',
  Length = 'length',
  Default = '',
}

interface SortParams {
  sortField: SortBy;
  isReversed: boolean;
}

function getPreparedGoods(
  goods: string[],
  { sortField, isReversed }: SortParams,
) {
  const preparedGoods = [...goods];

  if (sortField) {
    preparedGoods.sort((good1, good2) => {
      switch (sortField) {
        case SortBy.Alphabetically:
          return good1.localeCompare(good2);

        case SortBy.Length:
          return good1.length - good2.length;

        default:
          return 0;
      }
    });
  }

  if (isReversed) {
    return preparedGoods.reverse();
  }

  return preparedGoods;
}

export const App: React.FC = () => {
  const [sortField, setSortField] = useState<SortBy>(SortBy.Default);
  const [isReversed, setIsReversed] = useState(false);

  const sortGoods = getPreparedGoods(goodsFromServer, {
    sortField,
    isReversed,
  });

  const handleSortAlphabetically = () => {
    setSortField(SortBy.Alphabetically);
  };

  const handleSortByLength = () => {
    setSortField(SortBy.Length);
  };

  const handleReverse = () => {
    setIsReversed(!isReversed);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={classNames('button', 'is-info', {
            'is-light': sortField !== SortBy.Alphabetically,
          })}
          onClick={handleSortAlphabetically}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={classNames('button', 'is-success', {
            'is-light': sortField !== SortBy.Length,
          })}
          onClick={handleSortByLength}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={classNames('button', 'is-warning', {
            'is-light': !isReversed,
          })}
          onClick={handleReverse}
        >
          Reverse
        </button>

        {(sortField || isReversed) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setSortField(SortBy.Default);
              setIsReversed(false);
            }}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {sortGoods.map(good => (
          <li data-cy="Good" key={good}>
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
