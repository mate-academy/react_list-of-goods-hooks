import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
import { GoodsList } from './components/GoodsList';
import { Goods } from './types/Goods';
import { Buttons } from './components/Buttons';
import { Sort } from './types/Sort';
import { SortMethod } from './types/SortMethod';

export const goodsFromServer: Goods = [
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
const getPreparedGoods = (
  goods: Goods,
  {
    sortMethod,
    isReversed,
  }: {
    sortMethod: SortMethod;
    isReversed: boolean;
  },
): Goods => {
  let preparedGoods = [...goods];

  if (sortMethod) {
    preparedGoods.sort((good1, good2) => {
      switch (sortMethod) {
        case Sort.alphabetically:
          return good1.localeCompare(good2);
        case Sort.byLength:
          return good1.length - good2.length;
        default:
          return 0;
      }
    });
  }

  if (isReversed) {
    preparedGoods = preparedGoods.reverse();
  }

  return preparedGoods;
};

export const App: React.FC = () => {
  const [sortMethod, setSortMethod] = useState<SortMethod>('');
  const [isReversed, setIsReversed] = useState(false);

  const showGoods: Goods = getPreparedGoods(goodsFromServer, {
    sortMethod,
    isReversed,
  });

  return (
    <div className="section content">
      <Buttons
        sortMethod={sortMethod}
        setCurrentSortMethod={method => setSortMethod(method)}
        isReversed={isReversed}
        toggleOrderReversed={param => setIsReversed(param)}
      />

      <GoodsList goods={showGoods} />
    </div>
  );
};
