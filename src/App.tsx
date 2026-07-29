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
  'alphabet',
  'length',
  '' = '',
}

type Good = string;
type IsReverse = boolean;

function getPreparedGoods(
  goods: Good[],
  sortField: SortField,
  isReverse: IsReverse,
): Good[] {
  let preparedGoods = [...goods];

  if (sortField === SortField.alphabet) {
    preparedGoods = preparedGoods.toSorted((good1: Good, good2: Good) => {
      return good1.localeCompare(good2);
    });
  }

  if (sortField === SortField.length) {
    preparedGoods = preparedGoods.toSorted((good1: Good, good2: Good) => {
      return good1.length - good2.length;
    });
  }

  if (isReverse) {
    preparedGoods = preparedGoods.toReversed();
  }

  return preparedGoods;
}

export const App: React.FC = () => {
  const [sortField, setSortField] = useState<SortField>(SortField['']);

  const [isReverse, setIsReverse] = useState(false);
  const visibleGoods = getPreparedGoods(goodsFromServer, sortField, isReverse);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${sortField !== SortField.alphabet ? 'is-light' : ''}`}
          onClick={() => {
            setSortField(SortField.alphabet);
          }}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${sortField !== SortField.length ? 'is-light' : ''}`}
          onClick={() => {
            setSortField(SortField.length);
          }}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${isReverse !== true ? 'is-light' : ''}`}
          onClick={() => {
            setIsReverse(!isReverse);
          }}
        >
          Reverse
        </button>

        {(isReverse || sortField) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setSortField(SortField['']);
              setIsReverse(false);
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
