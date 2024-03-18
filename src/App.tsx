import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
import { SortType } from './types/SortType';
import { SortParams } from './types/SortParams';

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

function getPreparedGoods(
  goods: string[],
  reverse: boolean,
  { sortField }: SortParams,
) {
  const preparedGoods = [...goods];

  if (sortField) {
    preparedGoods.sort((good1, good2) => {
      switch (sortField) {
        case SortType.Name:
          return good1.localeCompare(good2);

        case SortType.Length:
          return good1.length - good2.length;

        default:
          return 0;
      }
    });
  }

  if (reverse) {
    preparedGoods.reverse();
  }

  return preparedGoods;
}

export const App: React.FC = () => {
  const [sortField, setSortField] = useState('');
  const [isReverse, setIsReverse] = useState(false);
  const visibleGoods = getPreparedGoods(goodsFromServer, isReverse, {
    sortField,
  });

  const handleReverse = (prevReverse: boolean) => {
    setIsReverse(!prevReverse);
  };

  const reset = () => {
    setIsReverse(false);
    setSortField('');
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => setSortField(SortType.Name)}
          type="button"
          className={`button is-info ${sortField !== SortType.Name && 'is-light'}`}
        >
          Sort alphabetically
        </button>

        <button
          onClick={() => setSortField(SortType.Length)}
          type="button"
          className={`button is-success ${sortField !== SortType.Length && 'is-light'}`}
        >
          Sort by length
        </button>

        <button
          onClick={() => handleReverse(isReverse)}
          type="button"
          className={`button is-warning ${isReverse !== true && 'is-light'}`}
        >
          Reverse
        </button>

        {(sortField || isReverse) && (
          <button
            onClick={reset}
            type="button"
            className={`button is-danger ${sortField === '' && 'is-light'}`}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {visibleGoods.map(good => {
          return (
            <li key={good} data-cy="Good">
              {good}
            </li>
          );
        })}
      </ul>
    </div>
  );
};
