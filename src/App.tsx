import cn from 'classnames';

import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';

export const goodsFromServer: string[] = [
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
  None = '',
}

function getSortedGoods(
  goods: string[],
  sortType: SortType,
  isReverse = false,
) {
  const preparedGoods = [...goods];

  if (sortType) {
    preparedGoods.sort((good1, good2) => {
      switch (sortType) {
        case SortType.Alphabet:
          return good1.localeCompare(good2);

        case SortType.Length:
          return good1.length - good2.length;

        default:
          return 0;
      }
    });
  }

  return isReverse ? preparedGoods.reverse() : preparedGoods;
}

export const App: React.FC = () => {
  const [sortType, setSortType] = useState(SortType.None);
  const [isReverse, setIsReverse] = useState(false);

  const sortedGoods = getSortedGoods(goodsFromServer, sortType, isReverse);

  function reset(): void {
    setSortType(SortType.None);
    setIsReverse(false);
  }

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={
            cn('button is-info', {
              'is-light': sortType !== SortType.Alphabet,
            })
          }
          onClick={() => setSortType(SortType.Alphabet)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={
            cn('button is-success', {
              'is-light': sortType !== SortType.Length,
            })
          }
          onClick={() => setSortType(SortType.Length)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={
            cn('button is-warning', {
              'is-light': !isReverse,
            })
          }
          onClick={() => setIsReverse(prev => !prev)}
        >
          Reverse
        </button>

        {
          (sortType || isReverse) && (
            <button
              type="button"
              className="button is-danger is-light"
              onClick={reset}
            >
              Reset
            </button>
          )
        }
      </div>

      <ul>
        <ul>
          {
            sortedGoods.map(good => <li data-cy="Good" key={good}>{good}</li>)
          }
        </ul>
      </ul>
    </div>
  );
};
