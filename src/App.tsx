import { useState } from 'react';
import { getGoods } from './api/goods';

import 'bulma/css/bulma.css';
import './App.scss';

import { GoodsList } from './components/GoodsList';
import { SortType } from './types/sortTypes';
import { SortButtons } from './components/SortButtons';

function sortGoods(list: string[], sortBy: SortType) {
  return list.toSorted((a, b) => {
    switch (sortBy) {
      case SortType.Name:
        return a.localeCompare(b);

      case SortType.Length:
        return a.length - b.length;

      default:
        return 0;
    }
  });
}

function updateGoods(sortBy: SortType, isReverse = false) {
  let goods = getGoods();

  if (sortBy !== SortType.None) {
    goods = sortGoods(goods, sortBy);
  }

  if (isReverse) {
    goods = goods.toReversed();
  }

  return goods;
}

export const App = () => {
  const [sortBy, setSortBy] = useState(SortType.None);
  const [isReverse, setIsReverse] = useState(false);

  function handleSort(sortCase: SortType) {
    setSortBy(sortCase);
  }

  function handleIsReverse(isReversed: boolean) {
    setIsReverse(isReversed);
  }

  const goods = updateGoods(sortBy, isReverse);

  return (
    <div className="section content">
      <SortButtons
        sortBy={sortBy}
        handleIsReverse={handleIsReverse}
        handleSort={handleSort}
        isReverse={isReverse}
      />
      <GoodsList goods={goods} />
    </div>
  );
};
