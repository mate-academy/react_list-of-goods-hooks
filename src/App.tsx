import React, { useState } from 'react';
import cn from 'classnames';

import 'bulma/css/bulma.css';
import './App.scss';

type Goods = string[];

export const goodsFromServer: Goods = [
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
  name = 'Name',
  length = 'Length',
}

interface SortProperty {
  sortField: string;
  isReversed: boolean;
}

function getPrepareGoods(
  goods: Goods,
  { sortField, isReversed }: SortProperty,
): Goods {
  const preparedGoods = [...goods];

  if (sortField) {
    preparedGoods.sort((good1, good2) => {
      if (sortField.includes(SortType.name)) {
        return good1.localeCompare(good2);
      }

      if (sortField.includes(SortType.length)) {
        return good1.length - good2.length;
      }

      return 0;
    });
  }

  if (isReversed) {
    return preparedGoods.reverse();
  }

  return preparedGoods;
}

export const App: React.FC = () => {
  const [sortField, setSortField] = useState('');
  const [isReversed, setIsReversed] = useState(false);
  const visibleGoods = getPrepareGoods(goodsFromServer, {
    sortField,
    isReversed,
  });

  function reset() {
    setSortField('');
    setIsReversed(false);
  }

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => setSortField(SortType.name)}
          type="button"
          className={cn(['button', 'is-info'], {
            'is-light': !sortField.includes(SortType.name),
          })}
        >
          Sort alphabetically
        </button>

        <button
          onClick={() => setSortField(SortType.length)}
          type="button"
          className={cn(['button', 'is-success'], {
            'is-light': !sortField.includes(SortType.length),
          })}
        >
          Sort by length
        </button>

        <button
          onClick={() => setIsReversed(!isReversed)}
          type="button"
          className={cn(['button', 'is-warning'], {
            'is-light': !isReversed,
          })}
        >
          Reverse
        </button>

        {sortField || isReversed ? (
          <button
            onClick={reset}
            type="button"
            className="button is-danger is-light"
          >
            Reset
          </button>
        ) : (
          ''
        )}
      </div>

      <ul>
        {visibleGoods.map(good => (
          <li data-cy="Good" key={good}>
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
