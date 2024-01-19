import 'bulma/css/bulma.css';
import './App.scss';
import React, { useState } from 'react';
import { SortType } from './types/Good';
import { SortBar } from './components/SortBar';
import { GoodsList } from './components/GoodsList';

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
  method: SortType,
  isReversedOrder: boolean,
) {
  const preparedGoods = [...goods];

  if (method) {
    switch (method) {
      case (SortType.Alphabet): {
        preparedGoods.sort((good1, good2) => good1.localeCompare(good2));
        break;
      }

      case (SortType.Length): {
        preparedGoods.sort((good1, good2) => good1.length - good2.length);
        break;
      }

      default:
        break;
    }
  }

  if (isReversedOrder) {
    preparedGoods.reverse();
  }

  return preparedGoods;
}

export const App: React.FC = () => {
  const [sortBy, setSortBy] = useState(SortType.Default);
  const [isReversed, setIsReversed] = useState(false);
  const goods = getPreparedGoods(goodsFromServer, sortBy, isReversed);

  const changeSortMethods = (sortMethod:SortType) => {
    setSortBy(sortMethod);
  };

  const setSortByDefault = () => {
    setSortBy(SortType.Default);
    setIsReversed(false);
  };

  return (
    <div className="section content">
      <SortBar
        sortBy={sortBy}
        changeSortMethods={changeSortMethods}
        setSortByDefault={setSortByDefault}
        isReversed={isReversed}
        setIsReversed={setIsReversed}
      />

      <ul>
        <GoodsList goods={goods} />
      </ul>
    </div>
  );
};
