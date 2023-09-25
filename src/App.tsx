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
  isReversed: boolean;
}

enum SortType {
  sortByAlpha = 'alpha',
  sortByLength = 'length',
}

function getPrepearedGoods(goods: Goods, { sortField, isReversed }: FnArg) {
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

  if (isReversed) {
    prepearedGoods = prepearedGoods.reverse();
  }

  return prepearedGoods;
}

export const App: React.FC = () => {
  const [sortField, setSortField] = useState('');
  const [isReversed, setIsReversed] = useState(false);
  const visibleGoods = getPrepearedGoods(goodsFromServer,
    { sortField, isReversed });

  function makeReset() {
    setSortField('');
    setIsReversed(false);
  }

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
          onClick={() => setIsReversed(!isReversed)}
          type="button"
          className={cn('button is-warning', { 'is-light': !isReversed })}
        >
          Reverse
        </button>

        {(sortField || isReversed) && (
          <button
            onClick={() => makeReset()}
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
