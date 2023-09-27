import 'bulma/css/bulma.css';
import './App.scss';
import React, { useState } from 'react';
import cn from 'classnames';
import { GoodsList } from './components/GoodsList';

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

const SORT_FIELD_NAME = 'name';
const SORT_FIELD_LENGTH = 'length';

type SortingOptions = {
  sortField: string;
  reverse: boolean;
};

function getPreparedGoods(
  goods: string[],
  { sortField, reverse }: SortingOptions,
): string[] {
  const preparedGoods = [...goods];

  if (sortField) {
    preparedGoods.sort((goodA, goodB) => {
      switch (sortField) {
        case SORT_FIELD_NAME:
          return goodA.localeCompare(goodB);

        case SORT_FIELD_LENGTH:
          return goodA.length - goodB.length;

        default:
          return 0;
      }
    });
  }

  if (reverse) {
    preparedGoods.reverse();
  }

  return preparedGoods;
}

export const App: React.FC = () => {
  const [sortField, setSortField] = useState<string>('');
  const [reverse, setReverse] = useState<boolean>(false);
  const visibleGoods = getPreparedGoods(goodsFromServer, {
    sortField,
    reverse,
  });

  const reset = () => {
    setSortField('');
    setReverse(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => setSortField(SORT_FIELD_NAME)}
          type="button"
          className={cn('button is-info', {
            'is-light': sortField !== SORT_FIELD_NAME,
          })}
        >
          Sort alphabetically
        </button>

        <button
          onClick={() => setSortField(SORT_FIELD_LENGTH)}
          type="button"
          className={cn('button is-success', {
            'is-light': sortField !== SORT_FIELD_LENGTH,
          })}
        >
          Sort by length
        </button>

        <button
          onClick={() => setReverse(currentState => !currentState)}
          type="button"
          className={cn('button is-warning', {
            'is-light': !reverse,
          })}
        >
          Reverse
        </button>

        {(sortField || reverse) && (
          <button
            onClick={reset}
            type="button"
            className="button is-danger is-light"
          >
            Reset
          </button>
        )}

      </div>

      <GoodsList goods={visibleGoods} />

    </div>
  );
};
