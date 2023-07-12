import 'bulma/css/bulma.css';
import './App.scss';
import { useState } from 'react';
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
  empty = '',
  alpha = 'alpha',
  length = 'length',
}

interface SortVer {
  sortField: SortType,
  reverseField: boolean,
}

function gerPreparedGoods(
  goods: string[],
  { sortField, reverseField }: SortVer,
) {
  const preraredGoods = [...goods];

  if (sortField) {
    preraredGoods
      .sort((good1, good2) => {
        switch (sortField) {
          case SortType.alpha:
            return good1.localeCompare(good2);

          case SortType.length:
            return good1.length - good2.length;

          default:
            return 0;
        }
      });
  }

  if (reverseField) {
    preraredGoods.reverse();
  }

  return preraredGoods;
}

export const App = () => {
  const [sortField, setSortField] = useState(SortType.empty);
  const [reverseField, setReverseField] = useState(false);

  const visibleGoods = gerPreparedGoods(
    goodsFromServer, { sortField, reverseField },
  );

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => setSortField(SortType.alpha)}
          type="button"
          className={cn('button', 'is-info', {
            'is-light': sortField !== SortType.alpha,
          })}
        >
          Sort alphabetically
        </button>

        <button
          onClick={() => setSortField(SortType.length)}
          type="button"
          className={cn('button', 'is-success', {
            'is-light': sortField !== SortType.length,
          })}
        >
          Sort by length
        </button>

        <button
          onClick={() => (setReverseField(!reverseField))}
          type="button"
          className={cn('button', 'is-warning', {
            'is-light': !reverseField,
          })}
        >
          Reverse
        </button>

        {(sortField || reverseField) && (
          <button
            onClick={() => {
              setSortField(SortType.empty);
              setReverseField(false);
            }}
            type="button"
            className="button is-danger is-light"
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {visibleGoods.map(good => <li key={good} data-cy="Good">{good}</li>)}
      </ul>
    </div>
  );
};
