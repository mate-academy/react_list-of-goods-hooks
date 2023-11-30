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
  alphabetically = 'alphabetically',
  byLength = 'byLength',
  byDefault = '',
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
        case SortFieldType.alphabetically:
          return product1.localeCompare(product2);

        case SortFieldType.byLength:
          return product1.length - product2.length;

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
  const [sortField, setSortField]
    = useState<SortFieldType>(SortFieldType.byDefault);
  const [isReversed, setIsReversed] = useState<boolean>(false);

  const visibleProducts
    = sortProducts(goodsFromServer, sortField, isReversed);

  const resetSorting = () => {
    setSortField(SortFieldType.byDefault);
    setIsReversed(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button is-info',
            { 'is-light': sortField !== SortFieldType.alphabetically })}
          onClick={() => setSortField(SortFieldType.alphabetically)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button is-success',
            { 'is-light': sortField !== SortFieldType.byLength })}
          onClick={() => setSortField(SortFieldType.byLength)}
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
