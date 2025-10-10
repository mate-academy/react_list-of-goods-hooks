import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
import { GoodsList } from './components/GoodsList';
import { Controls } from './components/Controls';
import { SortType } from './types/SortType';

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
  const visibleGoods: string[] = [...goodsFromServer];

  const [sortType, setSortType] = useState<SortType>(SortType.None);
  const [isReversed, setIsReversed] = useState(false);

  const handleSortAlpha = () => {
    setSortType(SortType.Alphabetically);
  };

  const handleSortByLength = () => {
    setSortType(SortType.ByLength);
  };

  const handleReset = () => {
    setSortType(SortType.None);
    setIsReversed(false);
  };

  const handleReverse = () => {
    setIsReversed(prev => !prev);
  };

  if (sortType === SortType.Alphabetically) {
    visibleGoods.sort((a, b) => a.localeCompare(b));
  } else if (sortType === SortType.ByLength) {
    visibleGoods.sort((a, b) => a.length - b.length);
  }

  if (isReversed) {
    visibleGoods.reverse();
  }

  return (
    <div className="section content">
      <Controls
        sortType={sortType}
        isReversed={isReversed}
        onSortAlpha={handleSortAlpha}
        onSortByLength={handleSortByLength}
        onReverse={handleReverse}
        onReset={handleReset}
      />
      <GoodsList goods={visibleGoods} />
    </div>
  );
};
