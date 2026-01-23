import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
import { goodsFromServer } from './components/GoodsFromServer';
import { List } from './components/List';
import { Button } from './components/Button';
import { SortType } from './components/types';

export const App: React.FC = () => {
  const [goods, setGoods] = useState<string[]>(goodsFromServer);
  const [activeSort, setActiveSort] = useState<SortType>(SortType.Default);

  const getSort = (sort: SortType) => {
    const goodsAlf = [...goods];

    switch (sort) {
      case SortType.Alphabet:
        goodsAlf.sort((a1, a2) => a1.localeCompare(a2));
        break;

      case SortType.Length:
        goodsAlf.sort((a1, a2) => a1.length - a2.length);
        break;

      case SortType.Reverse:
        goodsAlf.reverse();
        break;

      case SortType.Default:
        setActiveSort(sort);
        setGoods(goodsFromServer);

        return;
    }

    const isInitial =
      JSON.stringify(goodsAlf) === JSON.stringify(goodsFromServer);

    setGoods(goodsAlf);

    setActiveSort(isInitial ? SortType.Default : sort);
  };

  return (
    <div className="section content">
      <Button getSort={getSort} activeSort={activeSort} />
      <List goods={goods} />
    </div>
  );
};
