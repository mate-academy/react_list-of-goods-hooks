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
  SORT_FIELD_ALPH = 'alph',
  SORT_FIELD_LENGTH = 'length',
  SORT_FIELD_NONE = '',
}

function getPreparedGoods(
  goods: string[],
  sortField: SortType,
  toReverse: boolean,
) {
  const preparedGoods = [...goods];

  if (sortField) {
    preparedGoods.sort((good1, good2) => {
      switch (sortField) {
        case SortType.SORT_FIELD_ALPH:
          return good1.localeCompare(good2);

        case SortType.SORT_FIELD_LENGTH:
          return good1.length - good2.length;

        default:
          return 0;
      }
    });
  }

  if (toReverse) {
    preparedGoods.reverse();
  }

  return preparedGoods;
}

export const App: React.FC = () => {
  const [sortField, setSortField] = useState(SortType.SORT_FIELD_NONE);
  const [reversedField, setReversedField] = useState(false);

  const visibleGoods = getPreparedGoods(
    goodsFromServer, sortField, reversedField,
  );

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          onClick={() => setSortField(SortType.SORT_FIELD_ALPH)}
          className={cn('button is-info',
            { 'is-light': sortField !== SortType.SORT_FIELD_ALPH })}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          onClick={() => setSortField(SortType.SORT_FIELD_LENGTH)}
          className={cn('button is-success',
            { 'is-light': sortField !== SortType.SORT_FIELD_LENGTH })}
        >
          Sort by length
        </button>

        <button
          type="button"
          onClick={() => setReversedField(!reversedField)}
          className={cn('button is-warning',
            { 'is-light': !reversedField })}
        >
          Reverse
        </button>

        {(sortField !== '' || reversedField !== false) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setSortField(SortType.SORT_FIELD_NONE);
              setReversedField(false);
            }}
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
