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

enum SortType {
  ALPHABET = 'alphabet',
  LENGTH = 'length',
  DEFAULT = '',
}

const sorted = (goods: string[], sortBy: SortType, isReverse: boolean) => {
  let prepearedGoods = [...goods];

  if (sortBy) {
    prepearedGoods.sort((good1, good2) => {
      switch (sortBy) {
        case SortType.ALPHABET:
          return good1.localeCompare(good2);
        case SortType.LENGTH:
          return good1.length - good2.length;

        default:
          return 0;
      }
    });
  }

  if (isReverse) {
    prepearedGoods = prepearedGoods.reverse();
  }

  return prepearedGoods;
};

export const App: React.FC = () => {
  const [sortField, setSortField] = useState(SortType.DEFAULT);
  const [goodsReverse, setGoodsReverse] = useState(false);
  const visibleGoods = sorted(goodsFromServer, sortField, goodsReverse);

  const handleReset = () => {
    setSortField(SortType.DEFAULT);
    setGoodsReverse(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => setSortField(SortType.ALPHABET)}
          type="button"
          className={cn('button', 'is-info',
            { 'is-light': sortField !== SortType.ALPHABET })}
        >
          Sort alphabetically
        </button>

        <button
          onClick={() => setSortField(SortType.LENGTH)}
          type="button"
          className={cn('button', 'is-success',
            { 'is-light': sortField !== SortType.LENGTH })}
        >
          Sort by length
        </button>

        <button
          onClick={() => setGoodsReverse(!goodsReverse)}
          type="button"
          className={cn('button', 'is-warning', { 'is-light': !goodsReverse })}
        >
          Reverse
        </button>

        {(sortField || goodsReverse) && (
          <button
            onClick={() => handleReset()}
            type="button"
            className="button is-danger is-light"
          >
            Reset
          </button>
        )}

      </div>

      <ul>
        {visibleGoods.map(good => (
          <li data-cy="Good" key={good}>{good}</li>
        ))}
      </ul>
    </div>
  );
};
