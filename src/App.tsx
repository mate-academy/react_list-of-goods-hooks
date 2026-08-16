import React from 'react';
import { useState } from 'react';
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

type SortField = SortType | '';

enum SortType {
  SORT_ALPHABETICALLY = 'SORT_ALPHABETICALLY',
  SORT_LENGTH = 'SORT_LENGTH',
}

function getPrepearedGoods(
  goods: string[],
  options: { sortField: SortField; reverseField: boolean },
) {
  const { sortField, reverseField } = options;
  const preparedGoods = [...goods];

  if (sortField === SortType.SORT_ALPHABETICALLY) {
    preparedGoods.sort((a, b) => a.localeCompare(b));
  }

  if (sortField === SortType.SORT_LENGTH) {
    preparedGoods.sort((a, b) => a.length - b.length);
  }

  if (reverseField) {
    preparedGoods.reverse();
  }

  return preparedGoods;
}

export const App: React.FC = () => {
  const [sortField, setSortField] = useState<SortField>('');
  const [reverseField, setReverseField] = useState<boolean>(false);
  const visibleGoods = getPrepearedGoods(goodsFromServer, {
    sortField,
    reverseField,
  });

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button is-info', {
            'is-light': sortField !== SortType.SORT_ALPHABETICALLY,
          })}
          onClick={() => setSortField(SortType.SORT_ALPHABETICALLY)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button is-success', {
            'is-light': sortField !== SortType.SORT_LENGTH,
          })}
          onClick={() => setSortField(SortType.SORT_LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button is-warning', { 'is-light': !reverseField })}
          onClick={() => setReverseField(!reverseField)}
        >
          Reverse
        </button>

        {(sortField || reverseField) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setSortField('');
              setReverseField(false);
            }}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {visibleGoods.map(goods => (
          <li data-cy="Good" key={goods}>
            {goods}
          </li>
        ))}
      </ul>
    </div>
  );
};
