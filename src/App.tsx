import cn from 'classnames';
import { useState } from 'react';

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

enum SortField {
  Alphabet = 'alphabet',
  Length = 'length',
}

const getPreparedGoods = (
  goods: string[],
  sortField: string,
  reverse = true,
) => {
  let preparedGoods = [...goods];

  if (sortField) {
    preparedGoods.sort((good1, good2) => {
      switch (sortField) {
        case SortField.Alphabet:
          return good1.localeCompare(good2);
        case SortField.Length:
          return good1.length - good2.length;
        default:
          return 0;
      }
    });
  }

  if (reverse) {
    preparedGoods = preparedGoods.reverse();
  }

  return preparedGoods;
};

export const App = () => {
  const [sortField, setSortField] = useState('');
  const [reverse, setReverse] = useState(false);
  const visibleGoods = getPreparedGoods(goodsFromServer, sortField, reverse);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={
            cn(
              'button',
              'is-info',
              { 'is-light': sortField !== SortField.Alphabet },
            )
          }
          onClick={() => setSortField(SortField.Alphabet)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={
            cn(
              'button',
              'is-success',
              { 'is-light': sortField !== SortField.Length },
            )
          }
          onClick={() => setSortField(SortField.Length)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={
            cn(
              'button',
              'is-warning',
              { 'is-light': !reverse },
            )
          }
          onClick={() => setReverse(!reverse)}
        >
          Reverse
        </button>

        {(sortField.length > 0 || reverse) && (
          <button
            type="button"
            className={cn('button', 'is-danger', 'is-light')}
            onClick={() => {
              setSortField('');
              setReverse(false);
            }}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {visibleGoods.map(goodName => (
          <li data-cy="Good" key={goodName}>{goodName}</li>
        ))}
      </ul>
    </div>
  );
};
