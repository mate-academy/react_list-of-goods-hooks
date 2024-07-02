import React, { useState } from 'react';

import { goodsFromServer } from './data/goodsFromServer';
import { DEFAULT_SORT_TYPE, SortType } from './types/Sort';
import { SortPanel } from './components/SortPanel';
import { Product } from './types/Product';
import { ProductList } from './components/ProductList';
import 'bulma/css/bulma.css';
import './App.scss';

const getPreparedGoods = (
  goods: Product[],
  sortBy: SortType,
  isReversed: boolean,
): Product[] => {
  const preparedGoods: Product[] = [...goods];

  preparedGoods.sort((a, b) => {
    switch (sortBy) {
      case SortType.ASC:
        return a.title.localeCompare(b.title);
      case SortType.LENGTH:
        return a.title.length - b.title.length;
      default:
        return 0;
    }
  });

  if (isReversed) {
    preparedGoods.reverse();
  }

  return preparedGoods;
};

export const App: React.FC = () => {
  const [sortBy, setSortBy] = useState<SortType>(DEFAULT_SORT_TYPE);
  const [isReversed, setIsReversed] = useState<boolean>(false);

  const visibleGoods: Product[] = getPreparedGoods(
    goodsFromServer,
    sortBy,
    isReversed,
  );

  return (
    <div className="section content">
      <SortPanel
        activeSortType={sortBy}
        isReversed={isReversed}
        updateSort={setSortBy}
        updateReversed={setIsReversed}
      />

      <ProductList products={visibleGoods} />
    </div>
  );
};
