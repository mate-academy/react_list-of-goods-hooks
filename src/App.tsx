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

interface FilterParams {
  sortField: string;
  isReversed: boolean;
}

type IsLightFunction = (a: string, b: string) => string;

const SORT_FILED_ALPHABET = 'Sort alphabetically';
const SORT_FILED_LENGTH = 'Sort by length';

function getPrepareGoods(
  goods: string[],
  { sortField, isReversed }: FilterParams,
) {
  let preparedGoods = [...goods];

  if (sortField) {
    preparedGoods.sort((good1, good2) => {
      switch (sortField) {
        case SORT_FILED_ALPHABET:
          return good1.localeCompare(good2);
        case SORT_FILED_LENGTH:
          return good1.length - good2.length;
        default:
          return 0;
      }
    });
  }

  if (isReversed) {
    preparedGoods = preparedGoods.reverse();
  }

  return preparedGoods;
}

const isLightStyle: IsLightFunction = (sortField, sortFieldType) => {
  return sortField === sortFieldType ? '' : 'is-light';
};

export const App: React.FC = () => {
  const [sortField, setSortField] = useState('');
  const [isReversed, setIsReversed] = useState(false);

  const toggleReverse = () => {
    setIsReversed(prev => !prev);
  };

  const resetSortAndReverse = () => {
    setSortField('');
    setIsReversed(false);
  };

  const visibleGoods = getPrepareGoods(
    goodsFromServer,
    { sortField, isReversed },
  );

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`
            button
            is-info
            ${isLightStyle(sortField, SORT_FILED_ALPHABET)}
          `}
          onClick={() => setSortField(SORT_FILED_ALPHABET)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`
            button
            is-success
            ${isLightStyle(sortField, SORT_FILED_LENGTH)}
          `}
          onClick={() => setSortField(SORT_FILED_LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`
            button
            is-warning
            ${isReversed ? '' : 'is-light'}
          `}
          onClick={toggleReverse}
        >
          Reverse
        </button>

        {(sortField || isReversed) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={resetSortAndReverse}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {visibleGoods.map(good => (
          <li
            key={good}
            data-cy="Good"
          >
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
