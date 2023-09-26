import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
import { SortType } from './types/SortType';
import { GoodsList } from './components/GoodsList';
import { Buttons } from './components/Buttons/Buttons';

type Goods = string[];

export const goodsFromServer: Goods = [
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
  sortField: string,
  isReversed: boolean,
): Goods {
  const preparedGoods = [...goods];

  if (sortField) {
    preparedGoods.sort((good1, good2) => {
      switch (sortField) {
        case SortType.SORT_FIELD_LENGTH:
          return good1[sortField] - good2[sortField];

        case SortType.SORT_FIELD_ORDER:
          return good1.localeCompare(good2);

        default:
          return 0;
      }
    });
  }

  return isReversed ? preparedGoods.reverse() : preparedGoods;
}

export const App: React.FC = () => {
  const [sortField, setSortField] = useState('');
  const [isReversed, setIsReversed] = useState(false);

  const visablGoods = getPreparedGoods(
    goodsFromServer, sortField, isReversed,
  );

  return (
    <div className="section content">
      <Buttons
        sortField={sortField}
        sortBy={(field) => setSortField(field)}
        isReversed={isReversed}
        setReverse={(reverse) => setIsReversed(reverse)}
      />
      <GoodsList goods={visablGoods} />
    </div>
  );
};
