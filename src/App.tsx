import React, { useState } from 'react';
import 'bulma/css/bulma.css';

import './App.scss';
import { GoodList } from './components/GoodList';
import { Buttons } from './components/Buttons';
import { SortType } from './types/SortType';
import { SORT_BY } from './constanst/sortBy';

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

const list = [...goodsFromServer];

function prepereList(sortBy: SortType | string): string[] {
  switch (sortBy) {
    case SORT_BY.ALPHABET:
      return list.sort((good1, good2) => good1.localeCompare(good2));
    case SORT_BY.LENGTH:
      return list.sort((good1, good2) => good1.length - good2.length);
    case SORT_BY.REVERSE:
      return list.reverse();
    default:
      return goodsFromServer;
  }
}

export const App: React.FC = () => {
  const [sortBy, setSortby] = useState<SortType>(SortType.reset);
  const [isReversed, setIsReversed] = useState(false);

  const sortedList = prepereList(sortBy);

  return (
    <div className="section content">
      <Buttons
        setSortby={(sort) => setSortby(sort)}
        setIsReversed={(status) => setIsReversed(status)}
        isReversed={isReversed}
        sortBy={sortBy}
      />
      <GoodList goodsFromServer={sortedList} />
    </div>
  );
};
