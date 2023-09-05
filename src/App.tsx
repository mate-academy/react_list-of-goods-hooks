import 'bulma/css/bulma.css';
import cn from 'classnames';

import './App.scss';
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
  Letters = 'letters',
  Length = 'length',
  Initial = '',
}

function getPreparedGoods(
  goods: string[],
  sortField: SortType,
  reverseField = false,
) {
  const preparedGoods = [...goods];

  if (sortField) {
    preparedGoods.sort((a, b) => {
      switch (sortField) {
        case SortType.Letters:
          return a.localeCompare(b);
        case SortType.Length:
          return a.length - b.length;
        default:
          return 0;
      }
    });
  }

  if (reverseField) {
    preparedGoods.reverse();
  }

  return preparedGoods;
}

export const App = () => {
  const [sortField, setSortField] = useState(SortType.Initial);
  const [reverseField, setReverseField] = useState(false);
  const visibleGoods = getPreparedGoods(
    goodsFromServer, sortField, reverseField,
  );

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => setSortField(SortType.Letters)}
          type="button"
          className={cn('button is-info', {
            'is-light': sortField !== SortType.Letters,
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
              setSortField(SortType.Initial);
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
        {visibleGoods.map(good => (
          <li data-cy="Good" key={good}>{good}</li>
        ))}
      </ul>
    </div>
  );
};
