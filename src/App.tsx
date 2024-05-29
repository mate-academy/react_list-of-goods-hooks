import React from 'react';
import { useState } from 'react';
import classNames from 'classnames';
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

interface Params {
  sortField: string;
  isReversed: boolean;
}

enum SortType {
  default = '',
  sortFieldName = 'name',
  sortFieldLength = 'length',
}

function getPreparedGoods(goods: string[], { sortField, isReversed }: Params) {
  const preparedGoods = [...goods];

  if (sortField) {
    preparedGoods.sort((good1, good2) => {
      switch (sortField) {
        case SortType.sortFieldName:
          return good1.localeCompare(good2);

        case SortType.sortFieldLength:
          return good1.length - good2.length;

        default:
          return 0;
      }
    });
  }

  if (isReversed) {
    return [...preparedGoods].reverse();
  }

  return preparedGoods;
}

export const App: React.FC = () => {
  const [sortField, setSortField] = useState<SortType>(SortType.default);
  const [isReversed, setIsReversed] = useState(false);

  const visibleGoods = getPreparedGoods(goodsFromServer, {
    sortField,
    isReversed,
  });

  const reset = () => {
    setSortField(SortType.default);
    setIsReversed(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => setSortField(SortType.sortFieldName)}
          type="button"
          className={classNames('button', 'is-info', {
            'is-light': sortField !== SortType.sortFieldName,
          })}
        >
          Sort alphabetically
        </button>

        <button
          onClick={() => setSortField(SortType.sortFieldLength)}
          type="button"
          className={classNames('button', 'is-success', {
            'is-light': sortField !== SortType.sortFieldLength,
          })}
        >
          Sort by length
        </button>

        <button
          onClick={() => setIsReversed(!isReversed)}
          type="button"
          className={classNames('button', 'is-warning', {
            'is-light': !isReversed,
          })}
        >
          Reverse
        </button>

        {(sortField || isReversed) && (
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
        {visibleGoods.map(good => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
