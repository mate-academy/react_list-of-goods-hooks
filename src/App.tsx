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
  ALPHABET = 'alphabet',
  LENGTH = 'length',
  RESET = '',
}

interface FilterParams {
  sortValue: SortType;
  isReverse: boolean;
}

function sortGoods(
  goods: string[],
  { sortValue, isReverse }: FilterParams,
): string[] {
  const preparedGoods = goods;

  preparedGoods.sort((goodA, goodB) => {
    switch (sortValue) {
      case SortType.ALPHABET:
        return goodA.localeCompare(goodB);

      case SortType.LENGTH:
        return goodA.length - goodB.length;

      default:
        return 0;
    }
  });

  if (isReverse) {
    preparedGoods.reverse();
  }

  return preparedGoods;
}

export const App: React.FC = () => {
  const [isReverse, setIsReverse] = useState(false);
  const [sortValue, setSortValue] = useState(SortType.RESET);
  const sortedGoods = sortGoods([...goodsFromServer], { sortValue, isReverse });

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => setSortValue(SortType.ALPHABET)}
          type="button"
          className={cn('button is-info',
            { 'is-light': sortValue !== SortType.ALPHABET })}
        >
          Sort alphabetically
        </button>

        <button
          onClick={() => setSortValue(SortType.LENGTH)}
          type="button"
          className={cn('button is-success',
            { 'is-light': sortValue !== SortType.LENGTH })}
        >
          Sort by length
        </button>

        <button
          onClick={() => setIsReverse(!isReverse)}
          type="button"
          className={cn('button is-warning',
            { 'is-light': !isReverse })}
        >
          Reverse
        </button>

        {(sortValue || isReverse) && (
          <button
            onClick={() => {
              setSortValue(SortType.RESET);
              setIsReverse(false);
            }}
            type="button"
            className="button is-danger is-light"
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {sortedGoods.map(good => (
          <li data-cy="Good" key={good}>
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
