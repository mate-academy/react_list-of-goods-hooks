import 'bulma/css/bulma.css';
import './App.scss';
import React, { useState } from 'react';
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
  length = 'length',
  alphabet = 'alphabet',
  clear = '',
}

function getPrepearedGoods(
  goods: string[],
  sortField: string,
  reverseThis: boolean,
) {
  const preparedGoods = [...goods];

  if (sortField) {
    preparedGoods.sort((good1, good2) => {
      switch (sortField) {
        case SortType.alphabet:
          return good1.localeCompare(good2);

        case SortType.length:
          return good1.length - good2.length;

        default:
          return 0;
      }
    });
  }

  if (reverseThis) {
    preparedGoods.reverse();
  }

  return preparedGoods;
}

export const App: React.FC = () => {
  const [sortField, setSortField] = useState(SortType.clear);
  const [reverseThis, setReverseThis] = useState(false);
  const visibleGoods = getPrepearedGoods(
    goodsFromServer, sortField, reverseThis,
  );

  const reset = () => {
    setSortField(SortType.clear);
    setReverseThis(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          onClick={() => setSortField(SortType.alphabet)}
          className={cn('button is-info', {
            'is-light': sortField !== SortType.alphabet,
          })}

        >
          Sort alphabetically
        </button>

        <button
          type="button"
          onClick={() => setSortField(SortType.length)}
          className={cn('button is-success', {
            'is-light': sortField !== SortType.length,
          })}
        >
          Sort by length
        </button>

        <button
          type="button"
          onClick={() => setReverseThis(!reverseThis)}
          className={cn('button is-warning', {
            'is-light': !reverseThis,
          })}
        >
          Reverse
        </button>

        {(sortField || reverseThis) && (
          <button
            type="button"
            onClick={reset}
            className="button is-danger is-light"
          >
            Reset
          </button>
        )}

      </div>

      <ul>
        {visibleGoods.map(good => (
          <li
            data-cy="Good"
            key={good}
          >
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
