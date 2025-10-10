import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
import { GoodList } from './components/GoodsList/GoodsList';
import { SortButtons } from './components/SortButtons/SortButtons';
import { SortType } from './types/SortType';
import { Good } from './types/Good';
import { goodsFromServer } from './constants/goodsFromServer';
import { Sorter } from './types/Sorter';

export const App: React.FC = () => {
  const [reversed, setReversed] = useState(false);
  const [sortField, setSortField] = useState<SortType>(SortType.Default);

  const sorters: Record<SortType, Sorter> = {
    [SortType.Default]: () => 0,
    [SortType.Alphabetic]: (a: string, b: string): number => a.localeCompare(b),
    [SortType.Length]: (a: string, b: string): number => a.length - b.length,
  };

  const reset = () => {
    setReversed(false);
    setSortField(SortType.Default);
  };

  const getVisibleGoods = (): Good[] => {
    let goods: Good[] = [...goodsFromServer];

    if (sortField !== SortType.Default) {
      goods = goods.toSorted(sorters[sortField]);
    }

    if (reversed) {
      goods = goods.toReversed();
    }

    return goods;
  };

  const handleSortButtonClick = (field: SortType) => {
    setSortField(field);
  };

  const handleReverseButtonClick = () => {
    setReversed(prev => !prev);
  };

  const visibleGoods: Good[] = getVisibleGoods();

  return (
    <div className="section content">
      <SortButtons
        currentSortField={sortField}
        isReversed={reversed}
        onSortButtonClick={handleSortButtonClick}
        onReverseButtonClick={handleReverseButtonClick}
        onReset={reset}
      />

      <GoodList goods={visibleGoods} />
    </div>
  );
};
