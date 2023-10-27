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

const SORT_FIELD_LENGTH = 'length';
const SORT_FIELD_ALPH = 'alphabetically';

interface SortParams {
  sortField: string;
  isReversed: boolean;
}

function getPreparedGoods(
  goods: string[], {
    sortField,
    isReversed,
  }: SortParams,
) {
  const preparedGoods = [...goods];

  if (sortField) {
    preparedGoods.sort((a, b) => {
      switch (sortField) {
        case SORT_FIELD_ALPH:
          return a.localeCompare(b);

        case SORT_FIELD_LENGTH:
          return a.length - b.length;

        default:
          return 0;
      }
    });
  }

  return isReversed ? preparedGoods.reverse() : preparedGoods;
}

export const App: React.FC = () => {
  const [sortField, setSortField] = useState('');
  const [isReversed, setIsReversed] = useState(false);
  const sortedGoods = getPreparedGoods(goodsFromServer, {
    sortField,
    isReversed,
  });

  const shouldReset = isReversed || sortField;

  const handleReset = () => {
    setSortField('');
    setIsReversed(false);
  };

  const handleClickReverse = () => {
    setIsReversed((prev) => !prev);
  };

  const handleSortClick = (type: string) => () => {
    setSortField(type);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button', 'is-info', {
            'is-light': sortField !== SORT_FIELD_ALPH,
          })}
          onClick={handleSortClick(SORT_FIELD_ALPH)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button', 'is-info', {
            'is-light': sortField !== SORT_FIELD_LENGTH,
          })}
          onClick={handleSortClick(SORT_FIELD_LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button', 'is-info', { 'is-light': !isReversed })}
          onClick={handleClickReverse}
        >
          Reverse
        </button>

        {shouldReset && (
          <button
            type="button"
            className={cn('button', 'is-danger', 'is-light')}
            onClick={handleReset}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {sortedGoods.map((good) => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
