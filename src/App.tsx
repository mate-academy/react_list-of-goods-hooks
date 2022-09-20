import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
import { GoodsList } from './components/goodsList';
import { Controls } from './components/Controls';

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

enum SortType {
  NONE,
  ALPHABET,
  LENGTH,
}

type ReorderOptions = {
  sortType: SortType,
  isReversed: boolean,
};

export function getReorderedGoods(
  goods: string[],
  { isReversed, sortType }: ReorderOptions,
) {
  const visibleGoods = [...goods];

  visibleGoods.sort((productA, productB) => {
    switch (sortType) {
      case SortType.ALPHABET:
        return productA.localeCompare(productB);

      case SortType.LENGTH:
        return productA.length - productB.length;

      default:
        return 0;
    }
  });

  if (isReversed) {
    visibleGoods.reverse();
  }

  return visibleGoods;
}

export const App: React.FC = () => {
  const [sortType, setSort] = useState(SortType.NONE);
  const [isReversed, setReverse] = useState(false);

  const handleReset = () => {
    setSort(SortType.NONE);
    setReverse(false);
  };

  const handleReverse = () => {
    setReverse(!isReversed);
  };

  const handleAlphabetSort = () => {
    setSort(SortType.ALPHABET);
  };

  const handleLengthSort = () => {
    setSort(SortType.LENGTH);
  };

  const visibleGoods
    = getReorderedGoods(goodsFromServer, { isReversed, sortType });

  return (
    <div className="section content">
      <Controls
        reset={handleReset}
        reverse={handleReverse}
        alphabetSort={handleAlphabetSort}
        lengthSort={handleLengthSort}
        reverseState={isReversed}
        type={sortType}
      />
      <GoodsList goodies={visibleGoods} />
    </div>
  );
};
