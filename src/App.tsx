import React from 'react';
import { useState } from 'react';

import 'bulma/css/bulma.css';
import './App.scss';

import { SortType } from './Enums/SortType';
import { getGoodsInOrder } from './Utils/GetGoodsInOrder';

import {
  SortByAlphabet,
  SortByLength,
  ReverseList,
  ResetSort,
} from './Components/Buttons';

import { GoodsList } from './Components/GoodsList';

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

export const App: React.FC = () => {
  const [sortBy, setSortBy] = useState<SortType>(SortType.INITIAL);
  const [isReversed, setIsReversed] = useState(false);

  const sortedGoods = getGoodsInOrder(goodsFromServer, sortBy, isReversed);

  return (
    <div className="section content">
      <div className="buttons">
        <SortByAlphabet setSortBy={setSortBy} sortBy={sortBy} />
        <SortByLength setSortBy={setSortBy} sortBy={sortBy} />
        <ReverseList setIsReversed={setIsReversed} isReversed={isReversed} />

        {(isReversed || sortBy !== SortType.INITIAL) && (
          <ResetSort setSortBy={setSortBy} setIsReversed={setIsReversed} />
        )}
      </div>

      <GoodsList goods={sortedGoods} />
    </div>
  );
};
