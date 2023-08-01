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
  name = 'name',
  length = 'length',
}

function getPreparedGoods(
  goods: string[],
  sortField: string,
  isRev: boolean,
): string[] {
  const preparedGoods = [...goods];

  preparedGoods.sort((good1, good2) => {
    switch (sortField) {
      case SortType.length:
        return good1.length - good2.length;

      case SortType.name:
        return good1.localeCompare(good2);

      default:
        return 0;
    }
  });

  if (isRev) {
    preparedGoods.reverse();
  }

  return preparedGoods;
}

export const App: React.FC = () => {
  const [sortField, setSortField] = useState('');
  const [isRev, setIsReversed] = useState(false);

  const preparedGoods = getPreparedGoods(goodsFromServer, sortField, isRev);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => setSortField(SortType.name)}
          type="button"
          className={`button is-info ${sortField !== SortType.name && 'is-light'}`}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${sortField !== SortType.length && 'is-light'}`}
          onClick={() => setSortField(SortType.length)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button is-warning', { 'is-light': !isRev })}
          onClick={() => setIsReversed(!isRev)}
        >
          Reverse
        </button>

        {(sortField || isRev) && (
          <button
            onClick={() => {
              setSortField('');
              setIsReversed(false);
            }}
            type="button"
            className="button is-danger is-light"
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {preparedGoods.map(goods => (
          <li data-cy="Good" key={preparedGoods.indexOf(goods)}>{goods}</li>
        ))}
      </ul>
    </div>
  );
};
