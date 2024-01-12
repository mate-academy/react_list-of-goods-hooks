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
  alphabet = 'alphabet',
  length = 'length',
}

type Props = {
  sortBy: string,
  isReverse: boolean,
};

const getPrepareGoods = (goods: string[], { sortBy, isReverse }: Props) => {
  const prepareGoods = [...goods];

  if (sortBy) {
    prepareGoods.sort((goodA, goodB) => {
      switch (sortBy) {
        case SortBy.alphabet:
          return goodA.localeCompare(goodB);
        case SortBy.length:
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
          onClick={handleSort(SortBy.alphabet)}
          type="button"
          className={
            cn('button is-info', { 'is-light': sortBy !== 'alphabet' })
          }
        >
          Sort alphabetically
        </button>

        <button
          onClick={handleSort(SortBy.length)}
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
