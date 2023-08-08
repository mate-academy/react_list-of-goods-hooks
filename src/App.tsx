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
  Alphabet = 'alphabet',
  Length = 'length',
  None = '',
}

type SortOptions = {
  sortField: SortField | null;
  reverse: boolean;
};

function getPrepareGoods(
  goods: string[],
  { sortField, reverse }: SortOptions,
):string[] {
  const sortedGoods = [...goods];

  if (sortField !== SortField.None) {
    sortedGoods.sort((good1, good2) => {
      switch (sortField) {
        case SortField.Alphabet:
          return good1.localeCompare(good2);

        case SortField.Length:
          return good1.length - good2.length;

        default:
          return 0;
      }
    });
  }

  if (reverse) {
    sortedGoods.reverse();
  }

  return sortedGoods;
}

export const App: React.FC = () => {
  const [sortField, setSortField] = useState<SortField>(SortField.None);
  const [reverse, setReverse] = useState(false);
  const visibleGoods = getPrepareGoods(goodsFromServer, { sortField, reverse });

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button is-info', {
            'is-light': sortField !== SortField.Alphabet,
          })}
          onClick={() => {
            setSortField(SortField.Alphabet);
          }}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button is-success', {
            'is-light': sortField !== SortField.Length,
          })}
          onClick={() => {
            setSortField(SortField.Length);
          }}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button is-warning', {
            'is-light': !reverse,
          })}
          onClick={() => setReverse(!reverse)}
        >
          Reverse
        </button>

        <button
          type="button"
          className="button is-danger is-light"
          onClick={() => {
            setReverse(false);
            setSortField(SortField.None);
          }}
        >
          Reset
        </button>
      </div>

      <ul>
        {
          visibleGoods.map(good => (
            <li key={good} data-cy="Good">{good}</li>
          ))
        }
      </ul>
    </div>
  );
};
