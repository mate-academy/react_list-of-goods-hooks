import React, { useState } from 'react';
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

function sortByQuery(good1: string, good2: string, query: string): number {
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
  const [query, setQuery] = useState('');
  const [isReverse, setIsReverse] = useState(false);
  let visibleGoods = goodsFromServer;

  if (query !== '') {
    visibleGoods = visibleGoods.toSorted((good1, good2) =>
      // eslint-disable-next-line prettier/prettier
      sortByQuery(good1, good2, query));
  }

  if (isReverse) {
    visibleGoods = visibleGoods.toReversed();
  }

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => setQuery('alphabetically')}
          type="button"
          className={cn('button', 'is-info', {
            'is-light': query !== 'alphabetically',
          })}
        >
          Sort alphabetically
        </button>

        <button
          onClick={() => setQuery('length')}
          type="button"
          className={cn('button', 'is-success', {
            'is-light': query !== 'length',
          })}
        >
          Sort by length
        </button>

        <button
          onClick={() => setIsReverse(prev => !prev)}
          type="button"
          className={cn('button', 'is-warning', { 'is-light': !isReverse })}
        >
          Reverse
        </button>

        {(query !== '' || isReverse === true) && (
          <button
            onClick={() => {
              setIsReverse(false);
              setQuery('');
            }}
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
