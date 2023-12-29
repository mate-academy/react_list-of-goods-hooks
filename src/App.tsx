import React, { useState } from 'react';
import 'bulma/css/bulma.css';

import './App.scss';
import { GoodList } from './components/GoodList';
import { Buttons } from './components/Buttons';
import { SortType } from './types/SortType';

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

interface ActionParams {
  sortBy: SortType;
  isReversed: boolean;
}

function getPreparedList(
  goods: string[],
  { sortBy, isReversed }: ActionParams,
): string[] {
  const list = [...goods];

  list.sort((good1, good2) => {
    switch (sortBy) {
      case SortType.alphabet:
        return good1.localeCompare(good2);
      case SortType.length:
        return good1.length - good2.length;

      default: return 0;
    }
  });

  if (isReversed) {
    return list.reverse();
  }

  return list;
}

export const App: React.FC = () => {
  const [sortBy, setSortby] = useState<SortType>(SortType.initial);
  const [isReversed, setIsReversed] = useState(false);

  const sortedList = getPreparedList(goodsFromServer, { sortBy, isReversed });

  return (
    <div className="section content">
      <Buttons
        setSortby={(sort) => setSortby(sort)}
        setIsReversed={(status:boolean) => setIsReversed(status)}
        isReversed={isReversed}
        sortBy={sortBy}
      />
      <GoodList goodsFromServer={sortedList} />
    </div>
  );
};
