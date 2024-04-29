import React from 'react';
import { useState } from 'react';

import 'bulma/css/bulma.css';
import cn from 'classnames';

import './App.scss';
import { GoodsList } from './Components/GoodsList/GoodsList';

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
  Alphabetically = 'Alphabetically',
  Length = 'Length',
  None = '',
}

function getSortedGoods(
  goods: string[],
  sortField: SortType | '',
  reverse: boolean,
): string[] {
  let sortedGoods = [...goods];

  switch (sortField) {
    case SortType.Alphabetically:
      sortedGoods.sort();
      break;

    case SortType.Length:
      sortedGoods.sort((a, b) => a.length - b.length);
      break;

    default:
      break;
  }

  if (reverse) {
    sortedGoods = sortedGoods.reverse();
  }

  return sortedGoods;
}

export const App: React.FC = () => {
  const [sort, setSort] = useState<SortType>(SortType.None);
  const [reverse, setReverse] = useState(false);
  const visibleGoods = getSortedGoods(goodsFromServer, sort, reverse);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${sort !== SortType.Alphabetically ? 'is-light' : ''} `}
          onClick={() => setSort(SortType.Alphabetically)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${sort !== SortType.Length ? 'is-light' : ''} `}
          onClick={() => setSort(SortType.Length)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button is-warning', {
            'is-light': !reverse,
          })}
          onClick={() => setReverse(!reverse)}
        >
          Reverse
        </button>

        {(sort !== '' || reverse) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setSort(SortType.None);
              setReverse(false);
            }}
          >
            Reset
          </button>
        )}
      </div>

      <GoodsList goods={visibleGoods} />
    </div>
  );
};
