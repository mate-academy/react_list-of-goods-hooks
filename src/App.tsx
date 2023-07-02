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

enum SortFieldType {
  NONE = '',
  ALPH = 'alphabetical',
  LENGTH = 'length',
}

function getSortedGoods(
  goods: string[],
  sortField: string,
  sortReverse: boolean,
) {
  const newGoods = [...goods];

  if (!sortField && sortReverse) {
    return newGoods.reverse();
  }

  if (sortField) {
    newGoods.sort((good1, good2) => {
      switch (sortField) {
        case SortFieldType.LENGTH:
          return (sortReverse)
            ? good2.length - good1.length
            : good1.length - good2.length;

        case SortFieldType.ALPH:
          return (sortReverse)
            ? good2.localeCompare(good1)
            : good1.localeCompare(good2);

        default:
          return 0;
      }
    });
  }

  return newGoods;
}

export const App: React.FC = () => {
  const [sortField, setSortField] = useState(SortFieldType.NONE);
  const [sortReverse, setSortReverse] = useState(false);
  const sortedGoods = getSortedGoods(goodsFromServer, sortField, sortReverse);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn(
            'button',
            'is-info',
            { 'is-light': sortField !== SortFieldType.ALPH },
          )}
          onClick={() => {
            setSortField(SortFieldType.ALPH);
          }}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn(
            'button',
            'is-success',
            { 'is-light': sortField !== SortFieldType.LENGTH },
          )}
          onClick={() => {
            setSortField(SortFieldType.LENGTH);
          }}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn(
            'button',
            'is-warning',
            { 'is-light': !sortReverse },
          )}
          onClick={() => {
            setSortReverse(!sortReverse);
          }}
        >
          Reverse
        </button>

        {(sortField || sortReverse) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setSortReverse(false);
              setSortField(SortFieldType.NONE);
            }}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {sortedGoods.map(good => (
          <li
            data-cy="Good"
            key={good}
          >
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
