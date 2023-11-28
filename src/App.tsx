import React, { useState } from 'react';
import cn from 'classnames';
import 'bulma/css/bulma.css';
import './App.scss';
import { GoodsList } from './components/GoodList';

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
  NONE,
  ALPHABET,
  LENGTH,
}

function getPreparedGoods(
  goods: string[],
  sortType: SortType,
  reverse: boolean,
) {
  const preparedGoods = [...goods];

  if (sortType) {
    preparedGoods.sort((good1, good2) => {
      switch (sortType) {
        case SortType.ALPHABET:
          return good1.localeCompare(good2);
        case SortType.LENGTH:
          return good1.length - good2.length;
        default:
          return 0;
      }
    });
  }

  if (reverse) {
    preparedGoods.reverse();
  }

  return preparedGoods;
}

export const App: React.FC = () => {
  const [sortType, setSortType] = useState(SortType.NONE);
  const [reverse, setReverse] = useState(false);

  const visibleGoods = getPreparedGoods(goodsFromServer, sortType, reverse);

  const handleSortByAlphabet = () => {
    setSortType(SortType.ALPHABET);
  };

  const handleSortByLength = () => {
    setSortType(SortType.LENGTH);
  };

  const handleReverse = () => {
    setReverse(!reverse);
  };

  const handleReset = () => {
    setSortType(SortType.NONE);
    setReverse(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={handleSortByAlphabet}
          type="button"
          className={cn('button is-info',
            { 'is-light': sortType !== SortType.ALPHABET })}
        >
          Sort alphabetically
        </button>

        <button
          onClick={handleSortByLength}
          type="button"
          className={cn('button is-success',
            { 'is-light': sortType !== SortType.LENGTH })}
        >
          Sort by length
        </button>

        <button
          onClick={handleReverse}
          type="button"
          className={cn('button is-warning',
            { 'is-light': !reverse })}
        >
          Reverse
        </button>

        {(sortType !== SortType.NONE || reverse) && (
          <button
            onClick={handleReset}
            type="button"
            className="button is-danger is-light"
          >
            Reset
          </button>
        )}
      </div>
      <ul>
        <GoodsList goods={visibleGoods} />
      </ul>

    </div>
  );
};
