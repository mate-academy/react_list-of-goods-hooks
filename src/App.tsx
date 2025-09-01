import React from 'react';
import { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';

export enum GoodsFromServer {
  Dumplings = 'Dumplings',
  Carrot = 'Carrot',
  Eggs = 'Eggs',
  IceCream = 'Ice cream',
  Apple = 'Apple',
  Bread = 'Bread',
  Fish = 'Fish',
  Honey = 'Honey',
  Jam = 'Jam',
  Garlic = 'Garlic',
}

interface FilterParams {
  sortParam: string;
  isReversed: boolean;
}

enum SortType {
  Default = '',
  Alphabetically = 'alphabetically',
  ByLength = 'byLength',
}

function getPrepareGoods(
  goods: string[],
  { sortParam, isReversed = false }: FilterParams,
) {
  const prepareGoods = [...goods];

  prepareGoods.sort((goods1, goods2) => {
    switch (sortParam) {
      case 'alphabetically':
        return goods1.localeCompare(goods2);
      case 'byLength':
        return goods1.length - goods2.length;
      default:
        return 0;
    }
  });

  if (!isReversed) {
    return prepareGoods;
  }

  return prepareGoods.reverse();
}

const arraysAreEqual = (arr1: string[], arr2: string[]) => {
  if (arr1.length !== arr2.length) {
    return false;
  }

  let isEqual = true;

  arr1.forEach((value, index) => {
    if (value !== arr2[index]) {
      isEqual = false;
    }
  });

  return isEqual;
};

export const App: React.FC = () => {
  const [sortParam, setSortParam] = useState<SortType>(SortType.Default);
  const [isReversed, setIsReversed] = useState(false);
  const visibleGoods = getPrepareGoods(
    Object.values(GoodsFromServer).filter(value => typeof value === 'string'),
    { sortParam, isReversed },
  );

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${sortParam === SortType.Alphabetically ? '' : 'is-light'}`}
          onClick={() => {
            setSortParam(SortType.Alphabetically);
          }}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${sortParam === SortType.ByLength ? '' : 'is-light'}`}
          onClick={() => {
            setSortParam(SortType.ByLength);
          }}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${isReversed === true ? '' : 'is-light'}`}
          onClick={() => {
            setIsReversed(!isReversed);
          }}
        >
          Reverse
        </button>

        {!arraysAreEqual(
          visibleGoods,
          Object.values(GoodsFromServer).filter(
            value => typeof value === 'string',
          ),
        ) && (
          <button
            type="button"
            className={`button is-danger ${sortParam === SortType.Default && !isReversed ? '' : 'is-light'}`}
            onClick={() => {
              setSortParam(SortType.Default);
              setIsReversed(false);
            }}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {visibleGoods.map(good => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
