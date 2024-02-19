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
  length = 'length',
  alphabetically = 'alphabetically',
  none = '',
}

function getPreperedGoods(
  good: string[],
  sortField: SortType,
  reverseField: boolean,
) {
  const preperedGood = [...good];

  if (sortField) {
    preperedGood.sort((a, b) => {
      switch (sortField) {
        case SortType.length:
          return a.length - b.length;
        case SortType.alphabetically:
          return a.localeCompare(b);
        default:
          return 0;
      }
    });
  }

  if (reverseField) {
    return preperedGood.reverse();
  }

  return preperedGood;
}

export const App: React.FC = () => {
  const [sortField, setSortField] = useState(SortType.none);
  const [reverseField, setReverseField] = useState(false);
  const visibleGoods = getPreperedGoods(
    goodsFromServer,
    sortField,
    reverseField,
  );

  const reset = () => {
    setSortField(SortType.none);
    setReverseField(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button', 'is-info', {
            'is-light': sortField !== SortType.alphabetically,
          })}
          onClick={() => setSortField(SortType.alphabetically)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button', 'is-success', {
            'is-light': sortField !== SortType.length,
          })}
          onClick={() => setSortField(SortType.length)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button', 'is-warning', {
            'is-light': reverseField !== true,
          })}
          onClick={() => setReverseField(current => !current)}
        >
          Reverse
        </button>

        {(sortField || reverseField) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => reset()}
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
