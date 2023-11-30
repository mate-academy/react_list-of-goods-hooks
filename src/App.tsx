import React, { useState } from 'react';

import 'bulma/css/bulma.css';
import './App.scss';
import { goodsFromServer } from './api/GoodsFromServer';
import { FilterParams } from './interfaces/FilterParams';
import { SortType } from './interfaces/SortType';
import { Buttons } from './components/Buttons';
import { GoodsList } from './components/GoodsList';

function getPreperedGoods(
  goods: string[],
  { sortField, reverse }: FilterParams,
) {
  const preperedGoods = [...goods];

  if (sortField) {
    preperedGoods.sort((good1, good2) => {
      switch (sortField) {
        case SortType.name:
          return good1.localeCompare(good2);

        case SortType.length:
          return good1.length - good2.length;

        default:
          return 0;
      }
    });
  }

  if (reverse) {
    preperedGoods.reverse();
  }

  return preperedGoods;
}

export const App: React.FC = () => {
  const [sortField, setSortField] = useState('');
  const [reverse, setReverse] = useState(false);

  const visibleGoods = getPreperedGoods(
    goodsFromServer,
    { sortField, reverse },
  );

  const handleClickReset = () => {
    setSortField('');
    setReverse(false);
  };

  const handleClickSelect = (value: SortType) => {
    setSortField(value);
  };

  const handleClickReverse = () => {
    setReverse(!reverse);
  };

  const isResetButtonVisible = sortField || reverse;

  return (
    <div className="section content">
      <Buttons
        isResetButtonVisible={isResetButtonVisible}
        handleClickReset={handleClickReset}
        handleClickSelect={handleClickSelect}
        handleClickReverse={handleClickReverse}
        sortField={sortField}
        reverse={reverse}
      />

      <GoodsList
        visibleGoods={visibleGoods}
      />
    </div>
  );
};
