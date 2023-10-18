import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
import cn from 'classnames';

const SORT_FIELD_ALPHABET = 'alphabet';
const SORT_FIELD_LENGTH = 'length';

enum SortType {
  Dumplings = 'Dumplings',
  Carrot = 'Carrot',
  Eggs = 'Eggs',
  IceCream = 'Ice cream',
  Apple = 'Apple',
  Bread = 'Bread',
  Fish = 'Fish',
  Honey = 'Honey',
  Jam = 'Jam',
  Garlic = 'Garlic',
}

function getPreparedGoods(
  goods: SortType[],
  sortField: string,
  isReversed: boolean,
) {
  const preparedGoods = [...goods];

  if (sortField) {
    preparedGoods.sort((good1, good2) => {
      switch (sortField) {
        case SORT_FIELD_ALPHABET:
          return good1.localeCompare(good2);

        case SORT_FIELD_LENGTH:
          return good1.length - good2.length;

        default:
          return 0;
      }
    });
  }

  if (isReversed) {
    preparedGoods.reverse();
  }

  return preparedGoods;
}

export const App: React.FC = () => {
  const valuesSortType = Object.values(SortType);
  const [sortField, setSortField] = useState('');
  const [isReversed, setIsReversed] = useState(false);
  const visibleGoods = getPreparedGoods(valuesSortType, sortField, isReversed);
  const isResetVisible = sortField || isReversed;
  const handleReset = () => {
    setSortField('');
    setIsReversed(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          onClick={() => setSortField(SORT_FIELD_ALPHABET)}
          className={cn(
            { 'is-light': sortField !== SORT_FIELD_ALPHABET },
            'button is-info',
          )}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          onClick={() => setSortField(SORT_FIELD_LENGTH)}
          className={cn(
            { 'is-light': sortField !== SORT_FIELD_LENGTH },
            'button is-success',
          )}
        >
          Sort by length
        </button>

        <button
          type="button"
          onClick={() => setIsReversed(!isReversed)}
          className={cn(
            { 'is-light': !isReversed },
            'button is-warning',
          )}
        >
          Reverse
        </button>

        {(isResetVisible) && (
          <button
            type="button"
            onClick={handleReset}
            className="is-light button is-danger"
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {visibleGoods.map(good => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
