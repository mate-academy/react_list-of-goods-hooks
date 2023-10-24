import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';

import { Buttons } from './components/Buttons';
import { Products } from './components/Products';
import { SortBy } from './Types/sortBy';

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

function getPreparedGoods(
  goods: string[],
  sortedBy: SortBy | null,
  isReversed: boolean,
) {
  let preparedGoods = [...goods];

  if (sortedBy === null) {
    return [...goods];
  }

  if (sortedBy) {
    preparedGoods.sort((good1, good2) => {
      switch (sortedBy) {
        case SortBy.alphabet:
          return good1.localeCompare(good2);

        case SortBy.length:
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
}

export const App: React.FC = () => {
  const [sortBy, setSortBy] = useState<SortBy | null>(null);
  const [isReversed, setIsReversed] = useState(false);

  const visibleGoods = getPreparedGoods(goodsFromServer, sortBy, isReversed);

  return (
    <div className="section content">
      <Buttons
        sortBy={sortBy}
        setSortBy={setSortBy}
        isReversed={isReversed}
        setIsReversed={setIsReversed}
      />
      <Products visibleGoods={visibleGoods} />
    </div>
  );
};
