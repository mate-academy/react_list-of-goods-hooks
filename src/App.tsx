import React from 'react';
import 'bulma/css/bulma.css';
import './App.scss';

import cn from 'classnames';
import { useState } from 'react';

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
  Alphabet = 'Sort alphabetically',
  Length = 'Sort by length',
  Reverse = 'Reverse',
  Default = '',
}

type ReverseType = SortType.Reverse | SortType.Default;

export const App: React.FC = () => {
  const [typeOfSort, setTypeOfSort] = useState<SortType>(SortType.Default);
  const [sortReverse, setSortReverse] = useState<ReverseType>(SortType.Default);
  const copyGoods = [...goodsFromServer];

  switch (typeOfSort) {
    case SortType.Alphabet:
      copyGoods.sort((a, b) => a.localeCompare(b));
      break;
    case SortType.Length:
      copyGoods.sort((a, b) => a.length - b.length);
      break;
    default:
      break;
  }

  if (sortReverse === SortType.Reverse) {
    copyGoods.reverse();
  }

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button is-info', {
            'is-light': typeOfSort !== SortType.Alphabet,
          })}
          onClick={() => setTypeOfSort(SortType.Alphabet)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button is-success', {
            'is-light': typeOfSort !== SortType.Length,
          })}
          onClick={() => setTypeOfSort(SortType.Length)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button is-warning', {
            'is-light': sortReverse !== SortType.Reverse,
          })}
          onClick={() =>
            setSortReverse(
              sortReverse !== SortType.Reverse
                ? SortType.Reverse
                : SortType.Default,
            )
          }
        >
          Reverse
        </button>

        {(typeOfSort !== SortType.Default ||
          sortReverse !== SortType.Default) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setTypeOfSort(SortType.Default);
              setSortReverse(SortType.Default);
            }}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {copyGoods.map(good => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
