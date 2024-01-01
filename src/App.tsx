import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import cn from 'classnames';

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

interface GoodsParams {
  methodSort: string;
  reverse: true | false;
}

enum SortType {
  ALPHABET = 'by alphabet',
  LENGTH = 'by length',
}

function getPreparedGoods(
  goods: string[],
  { methodSort, reverse }: GoodsParams,
): string[] {
  const copyOfGoods = [...goods];

  if (methodSort) {
    copyOfGoods.sort((good1: string, good2: string) => {
      switch (methodSort) {
        case SortType.ALPHABET:
          return good1.localeCompare(good2);
        case SortType.LENGTH:
          return good1.length - good2.length;
        default:
          return 0;
      }
    });
  }

  if (reverse) {
    return copyOfGoods.reverse();
  }

  return copyOfGoods;
}

export const App: React.FC = () => {
  const [methodSort, setMethodSort] = useState('');
  const [reverse, setReverse] = useState(false);

  const visibleGoods = getPreparedGoods(
    goodsFromServer,
    { methodSort, reverse },
  );

  const sortAndReverse = () => {
    setMethodSort('');
    setReverse(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button is-info', {
            'is-light': methodSort !== SortType.ALPHABET,
          })}
          onClick={() => {
            setMethodSort(SortType.ALPHABET);
          }}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button is-success', {
            'is-light': methodSort !== SortType.LENGTH,
          })}
          onClick={() => {
            setMethodSort(SortType.LENGTH);
          }}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button is-warning', {
            'is-light': !reverse,
          })}
          onClick={() => {
            setReverse(!reverse);
          }}
        >
          Reverse
        </button>

        {(methodSort || reverse) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              sortAndReverse();
            }}
          >
            Reset
          </button>
        )}
      </div>

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
    </div>
  );
};
