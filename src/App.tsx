import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
import { GoodsList } from './components/GoodsList';
import { SortBar } from './components/SortBar';
import { Good } from './types/Good';
import { SortType } from './variables/constants';

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

interface SortRules {
  sortMethod: string,
  isReversed: boolean
}

function formatGoods(goods: Good[], sortRules: SortRules) {
  const goodsCopy = [...goods];

  switch (sortRules.sortMethod) {
    case SortType.Alphabetic:
      goodsCopy.sort((good1, good2) => good1.localeCompare(good2));
      break;
    case SortType.Length:
      goodsCopy.sort((good1, good2) => good1.length - good2.length);
      break;
    default:
      break;
  }

  if (sortRules.isReversed) {
    goodsCopy.reverse();
  }

  return goodsCopy;
}

export const App: React.FC = () => {
  const [isReversed, setIsReversed] = useState(false);
  const [sortMethod, setSortMethod] = useState('');

  const goods = formatGoods(goodsFromServer, { sortMethod, isReversed });

  return (
    <div className="section content">
      <SortBar
        sortBy={setSortMethod}
        onReverse={setIsReversed}
        sortMethod={sortMethod}
        isReversed={isReversed}
      />

      <GoodsList goods={goods} />
    </div>
  );
};
