import 'bulma/css/bulma.css';
import './App.scss';

import React, { useState } from 'react';
import { Good } from './types/Good';
import { FilteredParams } from './types/FilteredParams';
import { SortBy } from './types/SortBy';
import { Goods } from './Goods';
import { Buttons } from './Buttons';

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

const goodsWithID: Good[] = goodsFromServer.map((text: string, idx: number) => {
  return {
    id: idx,
    text,
  };
});

function getPreparedGoods(
  goods: Good[],
  { sortByElement, reverseVisibleGoods }: FilteredParams,
) {
  const preparedGoods = [...goods];

  if (sortByElement) {
    preparedGoods.sort((good1, good2) => {
      const val1 = good1.text;
      const val2 = good2.text;

      switch (sortByElement) {
        case SortBy.Length:
          return val1.length - val2.length;

        case SortBy.Alphabet:
          return val1.localeCompare(val2);

        default:
          return 0;
      }
    });
  }

  if (reverseVisibleGoods) {
    preparedGoods.reverse();
  }

  return preparedGoods;
}

export const App: React.FC = () => {
  const [sortByElement, setSortByElement] = useState(SortBy.Default);
  const [reverseVisibleGoods, setReverseVisibleGoods] = useState(false);

  const visibleGoods = getPreparedGoods(goodsWithID, {
    sortByElement,
    reverseVisibleGoods,
  });

  const handleSortByElement = (sortBy: SortBy) => {
    return setSortByElement(sortBy);
  };

  const handleReverseVisibleGoods = (isReverse: boolean) => {
    return setReverseVisibleGoods(isReverse);
  };

  return (
    <div className="section content">
      <Buttons
        sortByElement={sortByElement}
        reverseVisibleGoods={reverseVisibleGoods}
        changeFilter={handleSortByElement}
        changeDirection={handleReverseVisibleGoods}
      />

      <Goods goods={visibleGoods} />
    </div>
  );
};
