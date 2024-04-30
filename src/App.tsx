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

enum SortType {
  alphabet = 'alphabet',
  length = 'length',
  default = '',
}

type SortedMethods = {
  sortField: SortType;
  reverseField: boolean;
}

function getPreperedGoods(goods: string[], { sortField, reverseField }: SortedMethods ) {
  const preperedGoods = [...goods]

  if (sortField) {
    preperedGoods.sort((good1, good2) => {
      switch (sortField) {
        case SortType.length :
          return good1.length - good2.length;
        case SortType.alphabet:
          return good1.localeCompare(good2);
        default:
          return 0;
      }
    });
  }

  if (reverseField) {
    preperedGoods.reverse();
  }

  return preperedGoods;
}

export const App: React.FC = () => {
  const [sortField, setSortField] = useState<SortType>(SortType.default);
  const [reverseField, setReverse] = useState<boolean>(false);
  const visibleGoods = getPreperedGoods(goodsFromServer, {sortField, reverseField})
  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button is-info', {
            'is-light': sortField !== SortType.alphabet,
          })}
          onClick={() => setSortField(SortType.alphabet)}>
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button is-success', {
            'is-light': sortField !== SortType.length,
          })}
          onClick={() => setSortField(SortType.length)}>
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button is-warning', { 'is-light': !reverseField })}
          onClick={() => setReverse(!reverseField)}>
          Reverse
        </button>

        {(sortField || reverseField) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setReverse(false);
              setSortField(SortType.default);
            }}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        <ul>
        {visibleGoods.map(good => (
          <li data-cy="Good" key={good}>
            {good}
          </li>
        ))}
        </ul>
      </ul>
    </div>
  );
};
