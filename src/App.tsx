import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import cn from 'classnames/bind';
import './App.scss';
import { GoodsList } from './components/GoodsList/GoodsList';

export const goodsFromServer = [
  { id: 1, name: 'Dumplings' },
  { id: 2, name: 'Carrot' },
  { id: 3, name: 'Eggs' },
  { id: 4, name: 'Ice cream' },
  { id: 5, name: 'Apple' },
  { id: 6, name: 'Bread' },
  { id: 7, name: 'Fish' },
  { id: 8, name: 'Honey' },
  { id: 9, name: 'Jam' },
  { id: 10, name: 'Garlic' },
];

interface Good {
  id: number;
  name: string;
}

enum SortBy {
  abc = 'abc',
  length = 'length',
  initial = '',
}

function getReorderedGoods(
  goods: Good[],
  sortType: string,
  isReversed: boolean,
) {
  const visibleGoods = [...goods];

  if (sortType === SortBy.length) {
    visibleGoods.sort((good1, good2) => good1.name.length - good2.name.length);
  }

  if (sortType === SortBy.abc) {
    visibleGoods.sort((good1, good2) => good1.name.localeCompare(good2.name));
  }

  if (isReversed) {
    visibleGoods.reverse();
  }

  return visibleGoods;
}

export const App: React.FC = () => {
  const [sortField, setSortField] = useState<string>(SortBy.initial);
  const [reversed, setReversed] = useState<boolean>(false);
  const visibleGoods = getReorderedGoods(goodsFromServer, sortField, reversed);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button', 'is-info', {
            'is-light': sortField !== SortBy.abc,
          })}
          onClick={() => setSortField(SortBy.abc)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button', 'is-success', {
            'is-light': sortField !== SortBy.length,
          })}
          onClick={() => setSortField(SortBy.length)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button', 'is-warning', {
            'is-light': reversed !== true,
          })}
          onClick={() => setReversed(!reversed)}
        >
          Reverse
        </button>

        {sortField || reversed ? (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setSortField(SortBy.initial);
              setReversed(false);
            }}
          >
            Reset
          </button>
        ) : null}
      </div>

      <GoodsList goods={visibleGoods} />
    </div>
  );
};
