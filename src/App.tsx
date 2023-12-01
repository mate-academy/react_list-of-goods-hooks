import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import { GoodsType, GetFuncType } from './types/Types';
import { sortBy } from './const/const';
import { SortButtons } from './components/SortButtons/SortButtons';
import { DataList } from './components/DataList/DataList';
import './App.scss';

export const goodsFromServer: GoodsType = [
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

const getSortedGoods: GetFuncType = (goods, { sort, reverse }) => {
  if (sort) {
    goods.sort((a: string, b: string) => {
      switch (sort) {
        case sortBy.alphabet:
          return a.localeCompare(b);

        case sortBy.length:
          return a.length - b.length;

        default:
          return 0;
      }
    });
  }

  if (reverse) {
    return goods.reverse();
  }

  return goods;
};

export const App: React.FC = () => {
  const [sortedBy, setSortedBy] = useState<string>('');
  const [reverse, setReverse] = useState<boolean>(false);
  const visibleGoods = getSortedGoods(
    [...goodsFromServer], { sort: sortedBy, reverse },
  );

  const handlerReset = () => {
    setSortedBy('');
    setReverse(false);
  };

  return (
    <div className="section content">
      <SortButtons
        sortedBy={(value: string) => setSortedBy(value)}
        reverse={() => setReverse(!reverse)}
        reset={handlerReset}
        showReset={(sortedBy.length > 0 || reverse)}
        currentSorted={sortedBy}
        isRevers={reverse}
      />

      <DataList data={visibleGoods} />
    </div>
  );
};
