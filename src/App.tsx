import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
import cn from 'classnames';
import { SortGoods } from './components/SortGoods/SortGoods';

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
  byAlphabet = 'alphabet',
  byLength = 'length',
  reverseBy = 'reverse',
  default = '',
}

function getSortedGoods(goods: string[], type: SortType, reverse: SortType) {
  const sortedGoods = [...goods];

  if (type === SortType.byAlphabet) {
    sortedGoods.sort((good1, good2) => good1.localeCompare(good2));
  }

  if (type === SortType.byLength) {
    sortedGoods.sort((good1, good2) => good1.length - good2.length);
  }

  if (reverse === SortType.reverseBy) {
    sortedGoods.reverse();
  }

  return sortedGoods;
}

export const App: React.FC = () => {
  const [sortType, setSortType] = useState<SortType>(SortType.default);
  const [reverseType, setReverseType] = useState<SortType>(SortType.default);

  const sortedGoods = getSortedGoods(goodsFromServer, sortType, reverseType);

  const isReset = sortType !== SortType.default
    || reverseType !== SortType.default;

  const setResetSort = () => {
    setSortType(SortType.default);
    setReverseType(SortType.default);
  };

  const setReverseSort = () => setReverseType(
    reverseType === SortType.reverseBy
      ? SortType.default
      : SortType.reverseBy,
  );

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={
            cn(
              'button is-info',
              { 'is-light': sortType !== SortType.byAlphabet },
            )
          }
          onClick={() => setSortType(SortType.byAlphabet)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={
            cn('button is-success',
              { 'is-light': sortType !== SortType.byLength })
          }
          onClick={() => setSortType(SortType.byLength)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={
            cn('button is-warning',
              { 'is-light': reverseType !== SortType.reverseBy })
          }
          onClick={setReverseSort}
        >
          Reverse
        </button>

        {(isReset) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={setResetSort}
          >
            Reset
          </button>
        )}
      </div>

      <SortGoods goods={sortedGoods} />
    </div>
  );
};
