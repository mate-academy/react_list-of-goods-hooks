import React, { useState } from 'react';
import { v4 as getRandomKey } from 'uuid';

import { GoodsList } from './components/GoodsList';
import { SortButtons } from './components/ButtonsSortByList';

import { IGoods } from './types/Goods';
import { ESortButtons } from './types/SortByButtons';

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
        case ESortButtons.Alphabet:
          return goodsA.name.localeCompare(goodsB.name);

        case ESortButtons.Length:
          return goodsA.name.length - goodsB.name.length;

        default:
          throw Error('Incorrect sort type received');
      }
    });
  }

  if (isReversed) {
    sortedGoods.reverse();
  }

  return sortedGoods;
}

export const App: React.FC = () => {
  const [sortBy, setSortBy] = useState(ESortButtons.SortByNone);
  const [isReversed, setIsReversed] = useState(false);

  const preparedGoods = getPreparedGoods(goods, { sortBy, isReversed });

  const onSortByHandler = (query: string) => {
    if (ESortButtons.Alphabet === query
      || ESortButtons.Length === query) {
      setSortBy(query);
    }
  };

  const handleButtonReset = () => {
    setSortBy(ESortButtons.SortByNone);
    setIsReversed(false);
  };

  const handleButtonReverse = () => {
    setIsReversed(!isReversed);
  };

  return (
    <div className="section content">
      <SortButtons
        sortBy={sortBy}
        isReversed={isReversed}
        onSortByHandler={onSortByHandler}
        handleButtonReverse={handleButtonReverse}
        handleButtonReset={handleButtonReset}
      />

      <GoodsList goods={preparedGoods} />
    </div>
  );
};
