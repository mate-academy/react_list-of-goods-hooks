import { useState } from 'react';
import 'bulma/css/bulma.css';
import cn from 'classnames';

import './App.scss';

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
  SORT_FIELD_DEFAULT = '',
  SORT_FIELD_ALPHABET = 'alphabet',
  SORT_FIELD_LENGTH = 'length',
}

interface SortParams {
  sortField: SortField,
  reverse: boolean,
}

function resultGoodsArr(goods: string[], { sortField, reverse }: SortParams) {
  const resultingArr = [...goods];

  if (sortField) {
    resultingArr.sort((good1, good2) => {
      switch (sortField) {
        case (SortField.SORT_FIELD_ALPHABET):
          return good1.localeCompare(good2);
        case (SortField.SORT_FIELD_LENGTH):
          return good1.length - good2.length;
        default:
          return 0;
      }
    });
  }

  if (reverse) {
    resultingArr.reverse();
  }

  return resultingArr;
}

export const App: React.FC = () => {
  const [sortField, setSortField] = useState(SortField.SORT_FIELD_DEFAULT);
  const [reverse, setReverse] = useState(false);
  // eslint-disable-next-line
  const goods = resultGoodsArr(goodsFromServer, { sortField, reverse });

  const reset = () => {
    setSortField(SortField.SORT_FIELD_DEFAULT);
    setReverse(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button', 'is-info',
            {
              'is-light': sortField !== SortField.SORT_FIELD_ALPHABET,
            })}
          onClick={(() => setSortField(SortField.SORT_FIELD_ALPHABET))}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button', 'is-success',
            {
              'is-light': sortField !== SortField.SORT_FIELD_LENGTH,
            })}
          onClick={(() => setSortField(SortField.SORT_FIELD_LENGTH))}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button', 'is-warning',
            {
              'is-light': reverse !== true,
            })}
          onClick={() => setReverse(!reverse)}
        >
          Reverse
        </button>

        {(sortField || reverse) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={reset}
          >
            Reset
          </button>
        )}

      </div>

      <ul>
        {goods.map(good => (
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
