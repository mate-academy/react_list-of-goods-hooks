import React, { useState } from 'react';
import { v4 as getRandomKey } from 'uuid';

import { GoodsList } from './components/GoodsList';
import { ButtonsSortByList } from './components/ButtonsSortByList';

import { IGoods } from './types/Goods';
import { EButtonsSortBy } from './types/SortByButtons';

import 'bulma/css/bulma.css';
import './App.scss';

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

interface IGoodsQuery {
  sortBy: string;
  isReversed: boolean;
}

const goods: IGoods[] = goodsFromServer.map(name => (
  {
    key: getRandomKey(),
    name,
  }
));

function getPreparedGoods(
  goodsToPrepared: IGoods[],
  {
    sortBy,
    isReversed,
  }: IGoodsQuery,
) {
  const sortedGoods = [...goodsToPrepared];

  if (sortBy) {
    sortedGoods.sort((goodsA, goodsB) => {
      switch (sortBy) {
        case EButtonsSortBy.Alphabet:
          return goodsA.name.localeCompare(goodsB.name);

        case EButtonsSortBy.Length:
          return goodsA.name.length - goodsB.name.length;

        default: throw Error('Smth gone wrong');
      }
    });
  }

  if (isReversed) {
    sortedGoods.reverse();
  }

  return sortedGoods;
}

export const App: React.FC = () => {
  const [sortBy, setSortBy] = useState(EButtonsSortBy.SortByNone);
  const [isReversed, setIsReversed] = useState(false);

  const preparedGoods = getPreparedGoods(goods, { sortBy, isReversed });

  const onSortByHandler = (query: string) => {
    if (EButtonsSortBy.Alphabet === query
      || EButtonsSortBy.Length === query) {
      setSortBy(query);

      return;
    }

    if (EButtonsSortBy.Reset === query) {
      setSortBy(EButtonsSortBy.SortByNone);
      setIsReversed(false);
    }
  };

  const onReverseHandler = () => {
    setIsReversed(!isReversed);
  };

  return (
    <div className="section content">
      <ButtonsSortByList
        sortBy={sortBy}
        isReversed={isReversed}
        onSortByHandler={onSortByHandler}
        onReverseHandler={onReverseHandler}
      />

      <GoodsList goods={preparedGoods} />
    </div>
  );
};
