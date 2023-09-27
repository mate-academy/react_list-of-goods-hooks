// import React from 'react';
import 'bulma/css/bulma.css';
import './App.scss';

import { useState } from 'react';
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
  LENGTH = 'length',
  NAME = 'name',
  NONE = '',
}

function getPreparedGoods(
  goods: string[],
  sortField: SortType | null,
  isReversed: boolean,
) {
  const preparedGoods = [...goods];

  preparedGoods.sort((good1, good2) => {
    switch (sortField) {
      case SortType.NAME:
        return good1.localeCompare(good2);
      case SortType.LENGTH:
        return good1.length - good2.length;

      default:
        return 0;
    }
  });

  if (isReversed) {
    preparedGoods.reverse();
  }

  return preparedGoods;
}

export const App: React.FC = () => {
  const [sortField, setSortField] = useState<SortType>(SortType.NONE);
  const [isReversed, setReverse] = useState<boolean>(false);
  const goods = getPreparedGoods(
    goodsFromServer, sortField, isReversed,
  );

  const reset = () => {
    setSortField(SortType.NONE);
    setReverse(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => setSortField(SortType.NAME)}
          type="button"
          className={
            cn('button is-info', { 'is-light': sortField !== SortType.NAME })
          }
        >
          Sort alphabetically
        </button>

        <button
          onClick={() => setSortField(SortType.LENGTH)}
          type="button"
          className={cn('button is-success',
            { 'is-light': sortField !== SortType.LENGTH })}
        >
          Sort by length
        </button>

        <button
          onClick={() => setReverse(!isReversed)}
          type="button"
          className={cn('button is-warning',
            { 'is-light': !isReversed })}
        >
          Reverse
        </button>

        {(sortField || isReversed) && (
          <button
            onClick={reset}
            type="button"
            className={cn('button is-danger',
              { 'is-light': sortField })}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {goods.map(good => (
          <li data-cy="Good" key={good}>{good}</li>
        ))}
      </ul>
    </div>
  );
};
