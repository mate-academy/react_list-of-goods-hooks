import React from 'react';
import { useState } from 'react';

import 'bulma/css/bulma.css';

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
}

enum ButtonType {
  Alphabetically = 'Sort alphabetically',
  Length = 'Sort by length',
  Reverse = 'Reverse',
  Reset = 'Reset',
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
  const [sort, setSort] = useState<SortType | ''>('');
  const [reverse, setReverse] = useState<boolean>(false);
  const visibleGoods = getSortedGoods(goodsFromServer, sort, reverse);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${sort !== SortType.Alphabetically ? 'is-light' : ''} `}
          onClick={() => setSort(SortType.Alphabetically)}
        >
          {ButtonType.Alphabetically}
        </button>

        <button
          type="button"
          className={`button is-success ${sort !== SortType.Length ? 'is-light' : ''} `}
          onClick={() => setSort(SortType.Length)}
        >
          {ButtonType.Length}
        </button>

        <button
          type="button"
          className={`button is-warning ${!reverse && 'is-light'} `}
          onClick={() => setReverse(!reverse)}
        >
          {ButtonType.Reverse}
        </button>

        {(sort !== '' || reverse) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setSort('');
              setReverse(false);
            }}
          >
            {ButtonType.Reset}
          </button>
        )}
      </div>

      <GoodsList goods={visibleGoods} />
    </div>
  );
};
