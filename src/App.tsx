import React, { useState } from 'react';
import cn from 'classnames';
import 'bulma/css/bulma.css';
import './App.scss';
import { Button } from './components/button';

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
  Abc = 'abc',
  Length = 'length',
  Default = '',
}

type SortOptions = {
  sortBy: string,
  isReverse: boolean,
};

function getPreparedGoods(
  goods: string[],
  {
    sortBy,
    isReverse,
  }: SortOptions,
): string[] {
  const sortedGoods = [...goods];
  const reverse = isReverse;

  if (sortBy) {
    sortedGoods.sort((good1, good2) => {
      switch (sortBy) {
        case SortBy.Abc:
          return good1.localeCompare(good2);

        case SortBy.Length:
          return good1.length - good2.length;

        default:
          return 0;
      }
    });
  }

  if (reverse) {
    sortedGoods.reverse();
  }

  return sortedGoods;
}

function setReverse(
  isReverse: boolean,
  setIsRevers: React.Dispatch<React.SetStateAction<boolean>>,
): void {
  return isReverse === false ? setIsRevers(true) : setIsRevers(false);
}

export const App: React.FC = () => {
  const [sortBy, setSortBy] = useState(SortBy.Default);
  const [isReverse, setIsReverse] = useState(false);
  const goods = getPreparedGoods(goodsFromServer, { sortBy, isReverse });

  const resetSorting = () => {
    setIsReverse(false);
    setSortBy(SortBy.Default);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <Button
          className={cn('button', 'is-info',
            { 'is-light': sortBy !== SortBy.Abc })}
          onClick={() => setSortBy(SortBy.Abc)}
        >
          Sort alphabetically
        </Button>

        <Button
          className={cn('button', 'is-success',
            { 'is-light': sortBy !== SortBy.Length })}
          onClick={() => setSortBy(SortBy.Length)}
        >
          Sort by length
        </Button>

        <Button
          className={cn('button', 'is-warning',
            { 'is-light': isReverse === false })}
          onClick={() => setReverse(isReverse, setIsReverse)}
        >
          Reverse
        </Button>

        {(sortBy || isReverse) && (
          <Button
            className="button is-danger is-light"
            onClick={resetSorting}
          >
            Reset
          </Button>
        )}

      </div>

      <ul>
        {goods.map(good => (
          <li data-cy="Good" key={good}>
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
