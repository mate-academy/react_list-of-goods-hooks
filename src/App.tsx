import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
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

type Goods = Array<string>;

interface FnArg {
  sortField: string;
  reversed: boolean;
}

enum SortType {
  sortByAlpha = 'alpha',
  sortByLength = 'length',
}

function getPrepearedGoods(goods: Goods, { sortField, reversed }: FnArg) {
  let prepearedGoods = [...goods];

  if (sortField) {
    prepearedGoods.sort((a, b) => {
      switch (sortField) {
        case SortType.sortByAlpha:
          return a.localeCompare(b);
        case SortType.sortByLength:
          return a.length - b.length;
        default:
          return 0;
      }
    });
  }

  if (reversed) {
    prepearedGoods = prepearedGoods.reverse();
  }

  return prepearedGoods;
}

export const App: React.FC = () => {
  const [sortField, setSortField] = useState('');
  const [reversed, setReversed] = useState(false);
  const visibleGoods = getPrepearedGoods(goodsFromServer,
    { sortField, reversed });

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => setSortField(SortType.sortByAlpha)}
          type="button"
          className={cn('button is-info',
            { 'is-light': sortField !== SortType.sortByAlpha })}
        >
          Sort alphabetically
        </button>

        <button
          onClick={() => setSortField(SortType.sortByLength)}
          type="button"
          className={cn('button is-success',
            { 'is-light': sortField !== SortType.sortByLength })}
        >
          Sort by length
        </button>

        <button
          onClick={() => setReversed(!reversed)}
          type="button"
          className={cn('button is-warning', { 'is-light': !reversed })}
        >
          Reverse
        </button>

        {(sortField || reversed) && (
          <button
            onClick={() => {
              setSortField('');
              setReversed(false);
            }}
            type="button"
            className="button is-danger is-light"
          >
            Reset
          </button>
        )}

      </div>

      <ul>
        {visibleGoods.map(good => (
          <li key={good} data-cy="Good">{good}</li>
        ))}
      </ul>
    </div>
  );
};
