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

enum SortBy {
  Name = 'name',
  Length = 'length',
  Default = '',
}

function getPreparedGoods(
  goods: string[],
  sortField: SortBy,
  isReversedField: boolean,
) {
  const prepareGoods = [...goods];

  if (sortField) {
    prepareGoods.sort((good1, good2) => {
      switch (sortField) {
        case SortBy.Name:
          return good1.localeCompare(good2);

        case SortBy.Length:
          return good1[sortField] - good2[sortField];

        default:
          return 0;
      }
    });
  }

  return isReversedField
    ? prepareGoods.reverse()
    : prepareGoods;
}

export const App: React.FC = () => {
  const [sortField, setSortField] = useState(SortBy.Default);
  const [isReversedField, setIsReversed] = useState(false);

  const visibleGoods = getPreparedGoods(
    goodsFromServer,
    sortField,
    isReversedField,
  );

  const handleResetClick = () => {
    setSortField(SortBy.Default);
    setIsReversed(false);
  };

  const isResetButtonVisible = (sortField || isReversedField);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          onClick={() => setSortField(SortBy.Name)}
          className={cn(
            'button',
            'is-info',
            { 'is-light': sortField !== SortBy.Name },
          )}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          onClick={() => setSortField(SortBy.Length)}
          className={cn(
            'button',
            'is-success',
            { 'is-light': sortField !== SortBy.Length },
          )}
        >
          Sort by length
        </button>

        <button
          type="button"
          onClick={() => setIsReversed(!isReversedField)}
          className={cn(
            'button',
            'is-warning',
            { 'is-light': !isReversedField },
          )}
        >
          Reverse
        </button>

        {isResetButtonVisible && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={handleResetClick}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {visibleGoods.map(good => (
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
