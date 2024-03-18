import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
import { ListOfGoods } from './components/ListOfGoods';
import { PropsPanel } from './components/PropsPanel';

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

export const App: React.FC = () => {
  const [sortBy, setSortBy] = useState<string>('');
  const [isReversed, setIsReversed] = useState<boolean>(false);

  return (
    <div className="section content">
      <PropsPanel
        sort={sortBy}
        isReversed={isReversed}
        setSort={setSortBy}
        setIsReversed={setIsReversed}
      />

      <ListOfGoods
        goodTitles={[...goodsFromServer]}
        sortBy={sortBy}
        isReversed={isReversed}
      />
    </div>
  );
};
