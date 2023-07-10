import 'bulma/css/bulma.css';
import { useState } from 'react';

import './App.scss';
import { SortField } from './types/SortField';
import { GoodList } from './components/GoodList';
import { SortPanel } from './components/SortPanel';

export const goodsFromServer: string[] = [
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

interface SortParams {
  sortField: SortField,
  isReverse: boolean,
}

const getPreparedGoods = (
  goods: string[],
  { sortField, isReverse }: SortParams,
) => {
  const preparedGoods = [...goods];

  if (sortField) {
    preparedGoods.sort((good1, good2) => {
      switch (sortField) {
        case SortField.Alphabet:
          return good1.localeCompare(good2);

        case SortField.Length:
          return good1.length - good2.length;

        default:
          return 0;
      }
    });
  }

  if (isReverse) {
    return preparedGoods.reverse();
  }

  return preparedGoods;
};

export const App = () => {
  const [sortField, setSortField] = useState(SortField.Default);
  const [isReverse, setIsReverse] = useState(false);
  const visibleGoods = getPreparedGoods(goodsFromServer, {
    sortField,
    isReverse,
  });

  return (
    <div className="section content">
      <SortPanel sortPanelData={{
        sortField,
        isReverse,
        setSortField,
        setIsReverse,
      }}
      />

      <GoodList goods={visibleGoods} />
    </div>
  );
};
