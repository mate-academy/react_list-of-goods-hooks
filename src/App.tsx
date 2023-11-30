import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';

import cn from 'classnames';

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

export enum SortFieldType {
  sortAlphabetically = 'sortAlphabetically',
  sortByLength = 'sortByLength',
  sortByDefault = 'sortByDefault',
}

const sortProducts = (
  products: string[],
  sortField: SortFieldType,
  reversed: boolean,
) => {
  const sortedProducts = [...products];

  if (sortField) {
    sortedProducts.sort((product1, product2) => {
      switch (sortField) {
        case SortFieldType.sortAlphabetically:
          return product1.localeCompare(product2);

        case SortFieldType.sortByLength:
          return product1.length - product2.length;

        case SortFieldType.sortByDefault:
        default:
          return 0;
      }
    });
  }

  if (reversed) {
    sortedProducts.reverse();
  }

  return sortedProducts;
};

export const App: React.FC = () => {
  const [sortField, setSortField] = useState<string>('');
  const [isReversed, setIsReversed] = useState<boolean>(false);

  const visibleProducts
    = sortProducts(goodsFromServer, sortField as SortFieldType, isReversed);

  const resetSorting = () => {
    setSortField('');
    setIsReversed(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button is-info',
            { 'is-light': sortField !== SortFieldType.sortAlphabetically })}
          onClick={() => setSortField(SortFieldType.sortAlphabetically)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button is-success',
            { 'is-light': sortField !== SortFieldType.sortByLength })}
          onClick={() => setSortField(SortFieldType.sortByLength)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button is-warning', { 'is-light': !isReversed })}
          onClick={() => setIsReversed(reverseField => !reverseField)}
        >
          Reverse
        </button>

        {sortField || isReversed ? (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={resetSorting}
          >
            Reset
          </button>
        )
          : null}
      </div>

      <ul>
        {visibleProducts.map(product => (
          <li data-cy="Good" key={product}>{product}</li>
        ))}
      </ul>
    </div>
  );
};
