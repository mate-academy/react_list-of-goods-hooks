import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
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
  DEFAULT,
  ALPHABET,
  LENGHT,
}

interface Reorder {
  sortField: SortType;
  isReversed: boolean;
}

function getPreparedGoods(goods: string[], { sortField, isReversed }: Reorder) {
  const preparedGoods = [...goods];

  if (sortField !== SortType.DEFAULT) {
    preparedGoods.sort((good1, good2) => {
      switch (sortField) {
        case SortType.ALPHABET:
          return good1.localeCompare(good2);
        case SortType.LENGHT:
          return good1.length - good2.length;
        default:
          return 0;
      }
    });
  }

  if (isReversed) {
    preparedGoods.reverse();
  }

  return preparedGoods;
}

export const App: React.FC = () => {
  const [sortField, setSortField] = useState(SortType.DEFAULT);
  const [isReversed, setIsReversed] = useState(false);
  const goods = getPreparedGoods(goodsFromServer, { sortField, isReversed });

  function reset() {
    setSortField(SortType.DEFAULT);
    setIsReversed(false);
  }

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          onClick={() => setSortField(SortType.ALPHABET)}
          className={cn('button', 'is-info',
            { 'is-light': sortField !== SortType.ALPHABET })}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          onClick={() => setSortField(SortType.LENGHT)}
          className={cn('button', 'is-info',
            { 'is-light': sortField !== SortType.LENGHT })}
        >
          Sort by length
        </button>

        <button
          type="button"
          onClick={() => setIsReversed(!isReversed)}
          className={cn(
            'button is-warning',
            { 'is-light': !isReversed },
          )}
        >
          Reverse
        </button>

        {(isReversed || sortField !== SortType.DEFAULT) && (
          <button
            onClick={reset}
            type="button"
            className="button is-danger is-light"
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        <ul>
          {goods.map(good => (
            <li key={good} data-cy="Good">
              {good}
            </li>
          ))}
        </ul>
      </ul>
    </div>
  );
};
