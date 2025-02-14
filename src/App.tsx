import 'bulma/css/bulma.css';
import React, { useState } from 'react';
import './App.scss';
import { sortTypeFunction } from './commons/functions/sortTypeFunction';
import { goodsFromServer } from './commons/goodsFromServer';
import { SortPage } from './pages/SortPage';
import { SortType } from './types/SortType';

export const App: React.FC = () => {
  const [sortType, setSortType] = useState<SortType>(SortType.default);
  const [reverse, setReverse] = useState<boolean>(false);
  const visibleGoods: Array<string> = sortTypeFunction({
    goods: goodsFromServer,
    sortType,
    reverse,
  });

  return (
    <SortPage
      sortType={sortType}
      setSortType={setSortType}
      reverse={reverse}
      setReverse={setReverse}
      visibleGoods={visibleGoods}
    />
  );
};
