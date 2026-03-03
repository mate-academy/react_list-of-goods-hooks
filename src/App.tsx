//..
import { useState } from 'react';
import React from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
import { ListGoods } from './components/ListGoods/ListGoods';
import { Buttons } from './components/Buttons/Buttons';

export enum SortType {
  Alphabet = 'alphabet',
  Length = 'length',
}

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

export const App: React.FC = () => {
  const [sort, setSort] = useState<SortType | null>(null); // тип сортування
  const [isResetVisible, setIsResetVisible] = useState(false); // видимість кнопке ресет
  const [isReverseActive, setIsReverseActive] = useState(false); // флаг для кнопки реверс

  const sortAlphabetically = () => {
    setSort(SortType.Alphabet);
    setIsResetVisible(true);
  };

  const sortLength = () => {
    setSort(SortType.Length);
    setIsResetVisible(true);
  };

  const reset = () => {
    setSort(null);
    setIsReverseActive(false);
    setIsResetVisible(false);
  };

  const reverse = () => {
    setIsReverseActive(prev => !prev);
    setIsResetVisible(true);
  };

  const preparedGoods = [...goodsFromServer];

  if (sort === SortType.Alphabet) {
    preparedGoods.sort((a, b) => a.localeCompare(b));
  }

  if (sort === SortType.Length) {
    preparedGoods.sort((a, b) => a.length - b.length);
  }

  if (isReverseActive) {
    preparedGoods.reverse();
  }

  return (
    <div className="section content">
      <Buttons
        sortAlph={sortAlphabetically}
        sortLeng={sortLength}
        resetArr={reset}
        activeSort={sort}
        onReverse={reverse}
        isResetVisible={isResetVisible}
        isReverseActive={isReverseActive}
      />
      <ListGoods goods={preparedGoods} />
    </div>
  );
};
