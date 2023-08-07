import cn from 'classnames';
import React, { useState } from 'react';

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
  None,
  Length,
  Alphabet,
}

interface PreparedGoods {
  sortField: SortField,
  reverseField: boolean,
}

function getPreparedGoods(
  goods: string[],
  { sortField, reverseField }: PreparedGoods,
) {
  const preparedGoods = [...goods];

  if (sortField) {
    preparedGoods.sort((element1, element2) => {
      switch (sortField) {
        case SortField.Alphabet:
          return element1.localeCompare(element2);

        case SortField.Length:
          return element1.length - element2.length;

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

export const App: React.FC = () => {
  const [sortField, setSortField] = useState(SortField.None);
  const [isReversed, setIsReversed] = useState(false);
  const visibleGoods = getPreparedGoods(goodsFromServer,
    { sortField, reverseField: isReversed });

  const handleSort = (field: SortField) => () => setSortField(field);
  const handleReverse = () => setIsReversed(prevIsReversed => !prevIsReversed);
  const handleReset = () => {
    setIsReversed(false);
    setSortField(SortField.None);
  };

  const orderChanged = isReversed || sortField !== SortField.None;

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={handleSort(SortField.Alphabet)}
          type="button"
          className={cn('button is-info',
            { 'is-light': sortField !== SortField.Alphabet })}
        >
          Sort alphabetically
        </button>

        <button
          onClick={handleSort(SortField.Length)}
          type="button"
          className={cn('button is-success',
            { 'is-light': sortField !== SortField.Length })}
        >
          Sort by length
        </button>

        <button
          onClick={handleReverse}
          type="button"
          className={cn('button is-warning',
            { 'is-light': !isReversed })}
        >
          Reverse
        </button>

        {orderChanged && (
          <button
            onClick={handleReset}
            type="button"
            className="button is-danger is-light"
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {visibleGoods.map(element => (
          <li data-cy="Good">{element}</li>
        ))}
      </ul>
    </div>
  );
};
