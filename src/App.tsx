//..
import { useState } from 'react';
import React from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
import { ListGoods } from './components/ListGoods/ListGoods';
import { Buttons } from './components/Buttons/Buttons';

export type SortType = 'alphabet' | 'length' | null;

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
  const [sort, setSort] = useState<SortType>(null); // тип сортування
  const [isResetVisible, setIsResetVisible] = useState(false); // видимість кнопке ресет
  const [isReverseActive, setIsReverseActive] = useState(false); // флаг для кнопки реверс

  const sortAlphabetically = () => {
    setSort('alphabet');
    setIsResetVisible(true);
  };

  const sortLength = () => {
    setSort('length');
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

  if (sort === 'alphabet') {
    preparedGoods.sort((a, b) => a.localeCompare(b));
  }

  if (sort === 'length') {
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
