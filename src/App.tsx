import cn from 'classnames';

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
  Alphabet = 'alphabet',
  Length = 'length',
  None = '',
}

function getPreparedGoods(
  goods: string[],
  sortField: SortType,
  reverseField = false,
) {
  const visibleGoods = [...goods].map((good, index) => (
    {
      name: good,
      id: (index + 1),
      long: good.length,
    }
  ));

  if (sortField) {
    visibleGoods.sort((a, b): number => {
      switch (sortField) {
        case SortType.Alphabet:
          return a.name.localeCompare(b.name);

        case SortType.Length:
          return a.long - b.long;

        default:
          return 0;
      }
    });
  }

  if (reverseField) {
    visibleGoods.reverse();
  }

  return visibleGoods;
}

export const App: React.FC = () => {
  const [sortField, setSortField] = useState(SortType.None);
  const [reverseField, setReverseField] = useState(false);

  const goods = getPreparedGoods(
    goodsFromServer,
    sortField,
    reverseField,
  );

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => setSortField(SortType.Alphabet)}
          type="button"
          className={cn('button is-info', {
            'is-light': sortField !== SortType.Alphabet,
          })}
        >
          Sort alphabetically
        </button>

        <button
          onClick={() => setSortField(SortType.Length)}
          type="button"
          className={cn('button is-success', {
            'is-light': sortField !== SortType.Length,
          })}
        >
          Sort by length
        </button>

        <button
          onClick={() => setReverseField(!reverseField)}
          type="button"
          className={cn('button is-warning', {
            'is-light': !reverseField,
          })}
        >
          Reverse
        </button>

        {(sortField || reverseField) && (
          <button
            onClick={() => {
              setReverseField(false);
              setSortField(SortType.None);
            }}
            type="button"
            className="button is-danger is-light"
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {goods.map(good => (
          <li data-cy="Good" key={good.id}>
            {good.name}
          </li>
        ))}
      </ul>
    </div>
  );
};
