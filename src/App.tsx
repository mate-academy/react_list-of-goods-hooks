import React from 'react';
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
  Alphabet = 'alphabet',
  Length = 'length',
}

function getPrepareGoods(goods: string[], sortBy: string, isReversed: boolean) {
  const preparedGoods = [...goods];

  if (sortBy) {
    preparedGoods.sort((good1, good2) => {
      switch (sortBy) {
        case SortType.Alphabet:
          return good1.localeCompare(good2);
        case SortType.Length:
          return good1.length - good2.length;
        default:
          return 0;
      }
    });
  }

  if (isReversed) {
    return preparedGoods.reverse();
  }

  return preparedGoods;
}

export const App: React.FC = () => {
  const [typeSort, setTypeSort] = useState('');
  const [isReversed, setReverse] = useState(false);
  const sortedGoods = getPrepareGoods(goodsFromServer, typeSort, isReversed);

  const reset = () => {
    setTypeSort('');
    setReverse(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button', 'is-info', {
            'is-light': typeSort !== SortType.Alphabet,
          })}
          onClick={() => setTypeSort(SortType.Alphabet)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button', 'is-success', {
            'is-light': typeSort !== SortType.Length,
          })}
          onClick={() => setTypeSort(SortType.Length)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button', 'is-warning', {
            'is-light': !isReversed,
          })}
          onClick={() => setReverse(!isReversed)}
        >
          Reverse
        </button>
        {(typeSort || isReversed) && (
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
        {sortedGoods.map((good, index) => {
          return (
            <li data-cy="Good" key={sortedGoods[index]}>
              {good}
            </li>
          );
        })}
      </ul>
    </div>
  );
};
