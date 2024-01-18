import 'bulma/css/bulma.css';
import './App.scss';
import cn from 'classnames';
import React, { useState } from 'react';

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

enum SortBy {
  Alphabet = 'alphabet',
  Length = 'length',
}

type GoodsState = {
  sortBy: string,
  isReverse: boolean,
};

type GetGoods = (goods: string[],
  { sortBy, isReverse }: GoodsState) => string[];

const getPrepareGoods: GetGoods = (goods, { sortBy, isReverse }) => {
  const prepareGoods = [...goods];

  if (sortBy) {
    prepareGoods.sort((goodA, goodB) => {
      switch (sortBy) {
        case SortBy.Alphabet:
          return goodA.localeCompare(goodB);
        case SortBy.Length:
          return goodA.length - goodB.length;
        default:
          return 0;
      }
    });
  }

  if (isReverse) {
    prepareGoods.reverse();
  }

  return prepareGoods;
};

export const App: React.FC = () => {
  const [sortBy, setSortBy] = useState('');
  const [isReverse, setIsReverse] = useState(false);

  const goods = getPrepareGoods(goodsFromServer, { sortBy, isReverse });

  const handleSort = (sort: string) => () => setSortBy(sort);
  const handleReverse = () => setIsReverse(!isReverse);

  const reset = () => {
    setSortBy('');
    setIsReverse(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={handleSort(SortBy.Alphabet)}
          type="button"
          className={
            cn('button is-info', { 'is-light': sortBy !== SortBy.Alphabet })
          }
        >
          Sort alphabetically
        </button>

        <button
          onClick={handleSort(SortBy.Length)}
          type="button"
          className={
            cn('button is-success', { 'is-light': sortBy !== SortBy.Length })
          }
        >
          Sort by length
        </button>

        <button
          onClick={handleReverse}
          type="button"
          className={
            cn('button is-warning', { 'is-light': !isReverse })
          }
        >
          Reverse
        </button>

        {(isReverse || sortBy)
          && (
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
        {goods.map(good => (
          <li key={good} data-cy="Good">{good}</li>
        ))}
      </ul>
    </div>
  );
};
