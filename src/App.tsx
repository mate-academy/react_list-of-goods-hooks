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

enum SortField {
  ALPHABET = 'alphabet',
  LENGTH = 'length',
  DEFAULT = '',
}

type Props = {
  sortField: string;
  isReverse: boolean;
};

function getPreperedGoods(goods: string[], { sortField, isReverse }: Props) {
  const preperedGoods = [...goods];

  if (sortField !== SortField.DEFAULT) {
    preperedGoods.sort((good1, good2) => {
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

  if (isReverse) {
    preperedGoods.reverse();
  }

  return preperedGoods;
}

export const App: React.FC = () => {
  const [sortField, setSortField] = useState(SortField.DEFAULT);
  const [isReverse, setReverse] = useState(false);
  const visibleGoods = getPreperedGoods(goodsFromServer, {
    sortField,
    isReverse,
  });

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button is-info', {
            'is-light': sortField !== SortField.ALPHABET,
          })}
          onClick={() => setSortField(SortField.ALPHABET)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button is-success', {
            'is-light': sortField !== SortField.LENGTH,
          })}
          onClick={() => setSortField(SortField.LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button is-warning', {
            'is-light': !isReverse,
          })}
          onClick={() => setReverse(value => !value)}
        >
          Reverse
        </button>

        {(sortField !== '' || isReverse) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setSortField(SortField.DEFAULT);
              setReverse(false);
            }}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {visibleGoods.map(good => (
          <li data-cy="Good" key={good}>
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
