import React, { useState } from 'react';
import 'bulma/css/bulma.css';

import './App.scss';
import { SortType } from './enums/sort-type.enum';
import { Good } from './types/Good.type';
import { goodsFromServer } from './data/goods-from-server';
import { GoodList } from './components/GoodList';
import { ButtonGroup } from './components/ButtonGroup';

function getPreparedGoods(
  goods: Good[],
  sortField: SortType | '',
  isReversed: boolean,
): Good[] {
  const preparedGoods = [...goods];

  if (sortField) {
    preparedGoods.sort((good1, good2) => {
      switch (sortField) {
        case SortType.ALPHABETICALLY:
          return good1.localeCompare(good2);

        case SortType.BY_LENGTH:
          return good1.length - good2.length;

        default:
          return 0;
      }
    });
  }

  if (isReversed) {
    preparedGoods.reverse();
  }

  return preparedGoods;
}

export const App: React.FC = () => {
  const [sortField, setSortField] = useState<SortType | ''>('');
  const [isReversed, setIsReversed] = useState(false);

  const visibleGoods = getPreparedGoods(goodsFromServer, sortField, isReversed);

  const reset = () => {
    setSortField('');
    setIsReversed(false);
  };

  return (
    <div className="section content">
      <ButtonGroup
        sortField={sortField}
        isReversed={isReversed}
        setSortField={setSortField}
        setIsReversed={setIsReversed}
        reset={reset}
      />

      <GoodList goods={visibleGoods} />
    </div>
  );
};
