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

enum SortType {
  SortByAlphabet = 'Sort alphabetically',
  SortByLength = 'Sort by length',
  None = '',
}

interface FilterParam {
  sortField: SortType;
  isReversedField: boolean;
}

function getPreparedGoods(
  goods: string[],
  { sortField, isReversedField }: FilterParam,
) {
  const prepsredGoods = [...goods];

  if (sortField) {
    prepsredGoods.sort((good1, good2) => {
      switch (sortField) {
        case (SortType.SortByAlphabet):
          return good1.localeCompare(good2);

        case (SortType.SortByLength):
          return good1.length - good2.length;

        default:
          return 0;
      }
    });
  }

  if (isReversedField) {
    prepsredGoods.reverse();
  }

  return prepsredGoods;
}

export const App: React.FC = () => {
  const [sortField, setSortField] = useState(SortType.None);
  const [isReversedField, setIsReversedField] = useState(false);
  const visibleGoods = getPreparedGoods(
    goodsFromServer,
    { sortField, isReversedField },
  );

  const reset = () => {
    setSortField(SortType.None);
    setIsReversedField(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button is-info', {
            'is-light': sortField !== SortType.SortByAlphabet,
          })}
          onClick={() => setSortField(SortType.SortByAlphabet)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button is-success', {
            'is-light': sortField !== SortType.SortByLength,
          })}
          onClick={() => setSortField(SortType.SortByLength)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button is-warning', {
            'is-light': !isReversedField,
          })}
          onClick={() => {
            setIsReversedField(!isReversedField);
          }}
        >
          Reverse
        </button>

        {(sortField || isReversedField) && (
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
        { visibleGoods.map(good => (
          <li data-cy="Good" key={good}>
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
