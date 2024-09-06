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

enum SortType {
  BY_LENGTH = 'BY_LENGTH',
  BY_ALPHABET = 'BY_ALPHABET',
  DEFAULT = 'DEFAULT',
}

interface SortOptions {
  sortField: SortType;
  isReversed: boolean;
}

function preparedList(goods: string[], { sortField, isReversed }: SortOptions) {
  let prepared = [...goods];

  if (sortField) {
    switch (sortField) {
      case SortType.BY_ALPHABET:
        prepared.sort((item1, item2) => item1.localeCompare(item2));
        break;
      case SortType.BY_LENGTH:
        prepared.sort((item1, item2) => item1.length - item2.length);
        break;
      case SortType.DEFAULT:
        prepared = [...goods];
        break;
    }
  }

  if (isReversed) {
    prepared.reverse();
  }

  return prepared;
}

export const App: React.FC = () => {
  const [sortField, setSortField] = useState(SortType.DEFAULT);
  const [isReversed, setIsReversed] = useState(false);

  const visibleList = preparedList(goodsFromServer, { sortField, isReversed });

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button', 'is-info', {
            'is-light': sortField === SortType.BY_ALPHABET,
          })}
          onClick={() => setSortField(SortType.BY_ALPHABET)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button', 'is-success', {
            'is-light': sortField === SortType.BY_LENGTH,
          })}
          onClick={() => setSortField(SortType.BY_LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button', 'is-warning', { 'is-light': !isReversed })}
          onClick={() => setIsReversed(prevValue => !prevValue)}
        >
          Reverse
        </button>

        {(sortField !== SortType.DEFAULT || isReversed === true) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setSortField(SortType.DEFAULT);
              setIsReversed(false);
            }}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {visibleList.map(item => (
          <li key={item} data-cy="Good">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};
