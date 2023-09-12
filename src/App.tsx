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
  ALPHABET = 'alphabet',
  LENGTH = 'length',
}

interface SortParameters {
  sortField: string,
  sortReversed: boolean,
}

function getPreparedGoods(goods: string[],
  { sortField, sortReversed }: SortParameters) {
  const preparedGoods = [...goods];

  if (sortField) {
    preparedGoods.sort((good1, good2) => {
      switch (sortField) {
        case SortType.ALPHABET:
          return good1.localeCompare(good2);

        case SortType.LENGTH:
          return good1.length - good2.length;

        default:
          return 0;
      }
    });
  }

  if (sortReversed) {
    preparedGoods.reverse();
  }

  return preparedGoods;
}

export const App: React.FC = () => {
  const [sortField, setSortField] = useState('');
  const [sortReversed, setSortReversed] = useState(false);
  const visibleGoods
    = getPreparedGoods(goodsFromServer, { sortField, sortReversed });

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => setSortField(SortType.ALPHABET)}
          type="button"
          className={cn(
            'button is-info', {
              'is-light': sortField !== SortType.ALPHABET,
            },
          )}
        >
          Sort alphabetically
        </button>

        <button
          onClick={() => setSortField(SortType.LENGTH)}
          type="button"
          className={cn(
            'button is-success', {
              'is-light': sortField !== SortType.LENGTH,
            },
          )}
        >
          Sort by length
        </button>

        <button
          onClick={() => setSortReversed(!sortReversed)}
          type="button"
          className={cn(
            'button is-warning', {
              'is-light': !sortReversed,
            },
          )}
        >
          Reverse
        </button>

        {(sortField || sortReversed) && (
          <button
            onClick={() => {
              setSortField('');
              setSortReversed(false);
            }}
            type="button"
            className="button is-danger is-light"
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        <ul>
          {visibleGoods.map(good => (
            <li data-cy="Good">
              {good}
            </li>
          ))}
        </ul>
      </ul>
    </div>
  );
};
