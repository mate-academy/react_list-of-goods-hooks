import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
import { Goods } from './components/Goods';
import { Buttons } from './components/Buttons';
import { SortType } from './components/enums/SortType';

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

type FilterParams = {
  sortType: SortType,
  isReversed: boolean,
};

const getSortedGoods = (
  goods: string[],
  { sortType, isReversed }: FilterParams,
) => {
  const preparedGoods = [...goods];

  if (sortType) {
    preparedGoods.sort((good1: string, good2: string) => {
      switch (sortType) {
        case SortType.Length:
          return good1.length - good2.length;

        case SortType.Alphabet:
          return good1.localeCompare(good2);

        default:
          return 0;
      }
    });
  }

  if (isReversed) {
    preparedGoods.reverse();
  }

  return preparedGoods;
};

export const App: React.FC = () => {
  const [sortType, setSortType] = useState(SortType.Default);
  const [isReversed, setIsReversed] = useState(false);

  const sortedGoods = getSortedGoods(
    goodsFromServer,
    { sortType, isReversed },
  );

  return (
    <div className="section content">
      <Buttons
        sortBy={setSortType}
        onReverse={setIsReversed}
        sortType={sortType}
        isReversed={isReversed}
      />

      <Goods goods={sortedGoods} />
    </div>
  );
};
