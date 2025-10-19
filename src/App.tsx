import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
import { SortType, Good } from './types';
import { RenderGoodsButtons } from './RenderGoodsButtons';
import { RenderGoodlist } from './RenderGoodlist';

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
  const [sortBy, setSortBy] = useState<SortType>(SortType.None);
  const [isReversed, setIsReversed] = useState<boolean>(false);

  const getVisibleGoods = (): Good[] => {
    const visibleGoods = goodsFromServer.map((name, index) => ({
      id: index + 1,
      name,
    }));

    switch (sortBy) {
      case SortType.Alphabet:
        visibleGoods.sort((a, b) => a.name.localeCompare(b.name));
        break;

      case SortType.Length:
        visibleGoods.sort((a, b) => a.name.length - b.name.length);
        break;

      default:
        break;
    }

    if (isReversed) {
      visibleGoods.reverse();
    }

    return visibleGoods;
  };

  const goods = getVisibleGoods();

  const handleReset = (): void => {
    setSortBy(SortType.None);
    setIsReversed(false);
  };

  const handleSortAlphabetically = (): void => {
    setSortBy(SortType.Alphabet);
  };

  const handleSortByLength = (): void => {
    setSortBy(SortType.Length);
  };

  const handleReverse = (): void => {
    setIsReversed(prev => !prev);
  };

  return (
    <div className="section content">
      <RenderGoodsButtons
        sortBy={sortBy}
        isReversed={isReversed}
        onSortAlphabetically={handleSortAlphabetically}
        onSortByLength={handleSortByLength}
        onReverse={handleReverse}
        onReset={handleReset}
      />

      <RenderGoodlist goods={goods} />
    </div>
  );
};
