import React, { useState } from 'react';
import 'bulma/css/bulma.css';

import './App.scss';

import { Goods } from './components/Goods/Goods';
import { SortPanel } from './components/SortPanel/SortPanel';
import { SORT_TYPE, goodsFromServer } from './constants';

function getSortedGoods(
  goods: string[],
  sortField: string,
  isReversed: boolean,
): string[] {
  const sortedGoods = [...goods];

  if (sortField) {
    sortedGoods.sort((good1, good2) => {
      switch (sortField) {
        case SORT_TYPE.ALPHABET:
          return good1.localeCompare(good2);

        case SORT_TYPE.LENGTH:
          return good1.length - good2.length;

        default:
          return 0;
      }
    });
  }

  if (isReversed) {
    sortedGoods.reverse();
  }

  return sortedGoods;
}

export const App: React.FC = () => {
  const [sortField, setSortField] = useState('');
  const [isReversed, setIsReversed] = useState(false);

  const sortedGoods = getSortedGoods(goodsFromServer, sortField, isReversed);

  return (
    <div className="section content">
      <SortPanel
        sortField={sortField}
        setSortField={setSortField}
        isReversed={isReversed}
        setIsReversed={setIsReversed}
      />

      <Goods goods={sortedGoods} />
    </div>
  );
};
