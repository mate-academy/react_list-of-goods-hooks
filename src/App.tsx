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

const SORT_FIELD_LENGTH = 'length';
const SORT_FIELD_ALPH = 'alphabetically';

interface SortParams {
  sortField: string;
  isReversed: boolean;
}

function getPrreparedGoods(
  goods: string[],
  { sortField, isReversed }: SortParams,
) {
  const prepearedGoods = [...goods];

  if (sortField) {
    prepearedGoods.sort((a, b) => {
      switch (sortField) {
        case SORT_FIELD_LENGTH:
          return a.length - b.length;

        case SORT_FIELD_ALPH:
          return a.localeCompare(b);

        default:
          return 0;
      }
    });
  }

  return isReversed ? prepearedGoods.reverse() : prepearedGoods;
}

export const App = () => {
  const [sortField, setSortField] = useState('');
  const [isReversed, setIsReversed] = useState(false);

  const visibleGoods = getPrreparedGoods(goodsFromServer, {
    sortField,
    isReversed,
  });

  const causeButton = isReversed === true || sortField;

  const resetButton = () => {
    setSortField('');
    setIsReversed(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button', 'is-info', {
            'is-light': sortField !== SORT_FIELD_ALPH,
          })}
          onClick={() => setSortField(SORT_FIELD_ALPH)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button', 'is-success', {
            'is-light': sortField !== SORT_FIELD_LENGTH,
          })}
          onClick={() => setSortField(SORT_FIELD_LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button', 'is-warning', {
            'is-light': isReversed === false,
          })}
          onClick={() => setIsReversed(prev => !prev)}
        >
          Reverse
        </button>

        {causeButton && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={resetButton}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {visibleGoods.map(good => (
          <li data-cy="Good" key={good}>
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
