import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import cn from 'classnames';

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

const IS_DIRECT_ORDER = true;

type Good = string;

enum SortTypes {
  default = '',
  name = 'name',
  nameLength = 'length',
}

interface SortParams {
  sortParameter: SortTypes;
  order?: boolean;
}

function getPreparedGoods(
  goods: Good[],
  { sortParameter, order = true }: SortParams,
): Good[] {
  const preparedGoods = [...goods];

  if (sortParameter) {
    switch (sortParameter) {
      case SortTypes.name:
        preparedGoods.sort((good1, good2) => good1.localeCompare(good2));
        break;

      case SortTypes.nameLength:
        preparedGoods.sort((good1, good2) => good1.length - good2.length);
    }
  }

  return order ? preparedGoods : preparedGoods.reverse();
}

export const App: React.FC = () => {
  const [sortParameter, setSortParameter] = useState(SortTypes.default);
  const [order, setOrder] = useState(IS_DIRECT_ORDER);

  const visibleGoods = getPreparedGoods(goodsFromServer, {
    sortParameter,
    order,
  });

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button', 'is-info', {
            'is-light': sortParameter !== SortTypes.name,
          })}
          onClick={() => setSortParameter(SortTypes.name)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button', 'is-success', {
            'is-light': sortParameter !== SortTypes.nameLength,
          })}
          onClick={() => setSortParameter(SortTypes.nameLength)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button', 'is-warning', {
            'is-light': order,
          })}
          onClick={() => setOrder(!order)}
        >
          Reverse
        </button>

        {(sortParameter || !order) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setSortParameter(SortTypes.default);
              setOrder(IS_DIRECT_ORDER);
            }}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        <ul>
          {visibleGoods.map((good, id) => (
            <li data-cy="Good" key={id}>
              {good}
            </li>
          ))}
        </ul>
      </ul>
    </div>
  );
};
