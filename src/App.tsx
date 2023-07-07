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
  byAlphabet,
  byLength,
  default,
}

function getSortedGoods(goods: string[], type: SortType, reverse: boolean) {
  const sortedGoods = [...goods];

  sortedGoods.sort((good1: string, good2: string) => {
    switch (type) {
      case SortType.byAlphabet:
        return good1.localeCompare(good2);
      case SortType.byLength:
        return good1.length - good2.length;
      default:
        return 0;
    }
  });

  if (reverse) {
    sortedGoods.reverse();
  }

  return sortedGoods;
}

export const App: React.FC = () => {
  const [sortType, setSortType] = useState<SortType>(SortType.default);
  const [reverseType, setReverseType] = useState<boolean>(false);

  const sortedGoods = getSortedGoods(goodsFromServer, sortType, reverseType);

  const isReset = sortType !== SortType.default || reverseType;

  const setResetSort = () => {
    setSortType(SortType.default);
    setReverseType(false);
  };

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
          className={cn('button is-warning', { 'is-light': !reverseType })}
          onClick={() => setReverseType(reverseType !== true)}
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
