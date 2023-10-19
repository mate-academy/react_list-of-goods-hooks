import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
import { SortBy } from './types/SortBy';
import { Buttons } from './components/Buttons';
import { Products } from './components/Products/Products';

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
  const [sortField, setSortField] = useState('');
  const [isReversed, setIsReversed] = useState(false);
  const goods: string[] = [...goodsFromServer];

  if (sortField) {
    goods.sort((a: string, b: string) => {
      switch (sortField) {
        case SortBy.alphabet:
          return a.localeCompare(b);

        case SortBy.length:
          return a.length - b.length;

        default:
          return 0;
      }
    });
  }

  if (isReversed) {
    goods.reverse();
  }

  const reset = () => {
    setSortField('');
    setIsReversed(false);
  };

  return (
    <div className="section content">
      <Buttons
        sortField={sortField}
        setSortField={setSortField}
        isReversed={isReversed}
        setIsReversed={setIsReversed}
        reset={reset}
      />

      <Products
        goods={goods}
      />
    </div>
  );
};
