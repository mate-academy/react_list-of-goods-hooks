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

enum SortBy {
  Alphabet = 'alphabet',
  Length = 'length',
}

type StateVar = {
  sortBy: string,
  isReverse: boolean,
};

type Func = (goods: string[], { sortBy, isReverse }: StateVar) => string[];

const getPrepareGoods: Func = (goods, { sortBy, isReverse }) => {
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

  const GoodItems = () => (
    <ul>
      {goods.map(good => (
        <li key={good} data-cy="Good">{good}</li>
      ))}
    </ul>
  );

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
            cn('button is-info', { 'is-light': sortBy !== 'alphabet' })
          }
        >
          Sort alphabetically
        </button>

        <button
          onClick={handleSort(SortBy.Length)}
          type="button"
          className={
            cn('button is-success', { 'is-light': sortBy !== 'length' })
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
        <GoodItems />
      </ul>
    </div>
  );
};
