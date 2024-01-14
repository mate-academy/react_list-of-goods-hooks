import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
import { GoodsList } from './components/GoodsList';
import { SortBar } from './components/SortBar';
import { Good } from './types/Good';
import { SORT_ALPHABET, SORT_LENGTH } from './variables/constants';

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

function formatGoods(goods: Good[], sortMethod: string, isReversed: boolean) {
  const goodsCopy = [...goods];

  switch (sortMethod) {
    case SORT_ALPHABET:
      goodsCopy.sort((good1, good2) => good1.localeCompare(good2));
      break;
    case SORT_LENGTH:
      goodsCopy.sort((good1, good2) => good1.length - good2.length);
      break;
    default:
      break;
  }

  if (isReversed) {
    goodsCopy.reverse();
  }

  return goodsCopy;
}

export const App: React.FC = () => {
  const [isReversed, setIsReversed] = useState(false);
  const [sortMethod, setSortMethod] = useState('');

  const goods = formatGoods(goodsFromServer, sortMethod, isReversed);

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
