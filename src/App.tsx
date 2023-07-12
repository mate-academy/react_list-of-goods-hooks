import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
import { Buttons } from './components/Buttons/Buttons';
import { SortTypes } from './enum/SortTypes';
import { Goods } from './components/Goods/Goods';

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

interface PrepearedGoods {
  sortField: SortTypes;
  reversed: boolean;
}

function getPreparedGoods(
  goodsNames: string[],
  { sortField, reversed }: PrepearedGoods,
) {
  const prepearGoods = [...goodsNames];

  if (sortField) {
    prepearGoods.sort((good1, good2) => {
      switch (sortField) {
        case SortTypes.name:
          return good1.localeCompare(good2);

        case SortTypes.length:
          return good1.length - good2.length;

        default:
          return 0;
      }
    });
  }

  if (reversed) {
    prepearGoods.reverse();
  }

  return prepearGoods;
}

export const App: React.FC = () => {
  const [sortField, setSortField] = useState(SortTypes.default);
  const [reversed, setReversed] = useState(false);
  const visibleGoods = getPreparedGoods(
    goodsFromServer, { sortField, reversed },
  );

  return (
    <div className="section content">
      <Buttons
        sortField={sortField}
        setSortField={setSortField}
        reversed={reversed}
        setReversed={setReversed}
      />
      <Goods goods={visibleGoods} />
    </div>
  );
};
