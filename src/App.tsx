import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import { SortBy, GoodsType, Options } from './types/Types';
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

const getSortedGoods = (goods: GoodsType,
  {
    sort,
    isReversed,
  }: Options): GoodsType => {
  if (sort) {
    goods.sort((a: string, b: string) => {
      switch (sort) {
        case SortBy.Alphabet:
          return a.localeCompare(b);

        case SortBy.Length:
          return a.length - b.length;

        default:
          return 0;
      }
    });
  }

  if (isReversed) {
    return goods.reverse();
  }

  return goods;
};

export const App: React.FC = () => {
  const [sortedBy, setSortedBy] = useState<SortBy>(SortBy.Default);
  const [isReversed, setIsReversed] = useState(false);
  const visibleGoods = getSortedGoods(
    [...goodsFromServer], { sort: sortedBy, isReversed },
  );

  const handlerReset = () => {
    setSortedBy(SortBy.Default);
    setIsReversed(false);
  };

  return (
    <div className="section content">
      <SortButtons
        sortedBy={(value: SortBy) => setSortedBy(value)}
        reverse={() => setIsReversed(!isReversed)}
        reset={handlerReset}
        showReset={(sortedBy.length > 0 || isReversed)}
        currentSorted={sortedBy}
        isRevers={isReversed}
      />

      <DataList data={visibleGoods} />
    </div>
  );
};
