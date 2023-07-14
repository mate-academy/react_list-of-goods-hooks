import React, { useState } from 'react';
import cn from 'classnames';
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

enum SortField {
  NONE,
  ALPHABET,
  LENGTH,
}

interface FilterParams {
  sortField: SortField;
  sortReverse: boolean;
}

function getPreparedGoods(
  goods: string[],
  { sortField, sortReverse }: FilterParams,
) {
  const preparedGoods = [...goods];

  if (sortField) {
    preparedGoods.sort((good1, good2) => {
      switch (sortField) {
        case SortField.ALPHABET:
          return good1.localeCompare(good2);

        case SortField.LENGTH:
          return good1.length - good2.length;

        default:
          return 0;
      }
    });
  }

  if (sortReverse) {
    preparedGoods.reverse();
  }

  return preparedGoods;
}

export const App: React.FC = () => {
  const [sortField, setSortField] = useState(SortField.NONE);
  const [sortReverse, setSortReverse] = useState(false);

  const visibleGoods = getPreparedGoods(
    goodsFromServer, { sortField, sortReverse },
  );

  const sortByAlphabet = () => {
    setSortField(SortField.ALPHABET);
  };

  const sortByLength = () => {
    setSortField(SortField.LENGTH);
  };

  const reverse = () => setSortReverse(!sortReverse);

  const reset = () => {
    setSortField(SortField.NONE);
    setSortReverse(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={sortByAlphabet}
          type="button"
          className={cn('button is-info',
            { 'is-light': sortField !== SortField.ALPHABET })}
        >
          Sort alphabetically
        </button>

        <button
          onClick={sortByLength}
          type="button"
          className={cn('button is-info',
            { 'is-light': sortField !== SortField.LENGTH })}
        >
          Sort by length
        </button>

        <button
          onClick={reverse}
          type="button"
          className={cn('button is-warning',
            { 'is-light': !sortReverse })}
        >
          Reverse
        </button>

        {(sortField || sortReverse) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={reset}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        <ul>
          {visibleGoods.map(good => (
            <li
              data-cy="Good"
              key={good}
            >
              {good}
            </li>
          ))}
        </ul>
      </ul>
    </div>
  );
};
