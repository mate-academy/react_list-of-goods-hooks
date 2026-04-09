import React from 'react';

import 'bulma/css/bulma.css';
import './App.scss';
import { SortType } from './types/SortType';
import { Controls } from './components/Controls';
import { GoodList } from './components/GoodList';

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
  sortField: SortType,
  isReversed: boolean,
) {
  const preparedGoods = [...goods];

  if (sortField) {
    preparedGoods.sort((good1, good2) => {
      switch (sortField) {
        case SortType.ALPHABET:
          return good1.localeCompare(good2);

        case SortType.LENGTH:
          return good1.length - good2.length;

        default:
          return 0;
      }
    });
  }

  return isReversed ? [...preparedGoods].reverse() : preparedGoods;
}

export const App: React.FC = () => {
  const [sortField, setSortField] = React.useState<SortType>(SortType.DEFAULT);
  const [isReversed, setIsReversed] = React.useState<boolean>(false);

  const visibleGoods = getPreparedGoods(goodsFromServer, sortField, isReversed);

  const handleSort = (type: SortType) => {
    setSortField(type);
  };

  const handleReverse = () => {
    setIsReversed(prevState => !prevState);
  };

  const resetList = () => {
    setSortField(SortType.DEFAULT);
    setIsReversed(false);
  };

  return (
    <div className="section content">
      <Controls
        sortField={sortField}
        onSort={handleSort}
        isReversed={isReversed}
        onReverse={handleReverse}
        resetList={resetList}
      />

      <GoodList visibleGoods={visibleGoods} />
    </div>
  );
};
