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

enum SortField {
  alphabet = 'alphabet',
  length = 'length',
}

function sortGoods(
  goods: string[],
  sortField: SortField | '',
  reverse: boolean,
) {
  const changedGoods = [...goods];

  if (sortField) {
    changedGoods.sort((good1, good2) => {
      switch (sortField) {
        case SortField.alphabet:
          return good1.localeCompare(good2);

        case SortField.length:
          return good1.length - good2.length;

        default:
          return 0;
      }
    });
  }

  if (reverse) {
    return changedGoods.reverse();
  }

  return changedGoods;
}

export const App: React.FC = () => {
  const [sortField, setSortField] = useState<SortField | ''>('');
  const [isReversed, setIsReversed] = useState(false);

  const visibleGoods = sortGoods(goodsFromServer, sortField, isReversed);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button', 'is-info', {
            'is-light': sortField !== SortField.alphabet,
          })}
          onClick={() => setSortField(SortField.alphabet)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button', 'is-success', {
            'is-light': sortField !== SortField.length,
          })}
          onClick={() => setSortField(SortField.length)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button', 'is-warning', {
            'is-light': !isReversed,
          })}
          onClick={() => setIsReversed(!isReversed)}
        >
          Reverse
        </button>

        {(sortField || isReversed) && (
          <button
            type="button"
            className={cn('button', 'is-danger', 'is-light')}
            onClick={() => {
              setSortField('');
              setIsReversed(false);
            }}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {visibleGoods.map(good => {
          return (
            <li key={good} data-cy="Good">
              {good}
            </li>
          );
        })}
      </ul>
    </div>
  );
};
