import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
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

enum QueryType {
  Default = '',
  Alphabetically = 'alphabetically',
  Length = 'length',
}

function sortByQuery(good1: string, good2: string, query: QueryType): number {
  switch (query) {
    case 'alphabetically':
      return good1.localeCompare(good2);
    case 'length':
      return good1.length - good2.length;
    default:
      return 0;
  }
}

export const App: React.FC = () => {
  const [query, setQuery] = useState(QueryType.Default);
  const [isReverse, setIsReverse] = useState(false);
  let visibleGoods = goodsFromServer;

  const handleSetSortAlphabetically = () => setQuery(QueryType.Alphabetically);

  const handleSetSortLength = () => setQuery(QueryType.Length);

  const handleReset = () => {
    setIsReverse(false);
    setQuery(QueryType.Default);
  };

  const handleReverse = () => setIsReverse(prev => !prev);

  if (query !== '') {
    visibleGoods = [
      ...visibleGoods.sort((good1, good2) => sortByQuery(good1, good2, query)),
    ];
  }

  if (isReverse) {
    visibleGoods = [...visibleGoods.reverse()];
  }

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={handleSetSortAlphabetically}
          type="button"
          className={cn('button', 'is-info', {
            'is-light': query !== 'alphabetically',
          })}
        >
          Sort alphabetically
        </button>

        <button
          onClick={handleSetSortLength}
          type="button"
          className={cn('button', 'is-success', {
            'is-light': query !== 'length',
          })}
        >
          Sort by length
        </button>

        <button
          onClick={handleReverse}
          type="button"
          className={cn('button', 'is-warning', { 'is-light': !isReverse })}
        >
          Reverse
        </button>

        {(query !== '' || isReverse === true) && (
          <button
            onClick={handleReset}
            type="button"
            className="button is-danger is-light"
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {visibleGoods.map(good => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
