import React, { useState } from 'react';
import { ProductList } from './ProductList';
import { Product, SortType } from './types';

const getSortedProducts = (list: Product[], type: SortType): Product[] => {
  if (type === SortType.Default) {
    return [...list];
  }

  const sortedList = [...list];

  switch (type) {
    case SortType.Name:
      return sortedList.sort((a, b) => a.name.localeCompare(b.name));
    case SortType.Price:
      return sortedList.sort((a, b) => a.price - b.price);
    case SortType.Length:
      return sortedList.sort((a, b) => a.name.length - b.name.length);
    default:
      return sortedList;
  }
};

const initialProducts: Product[] = [
  { id: 1, name: 'Garlic', price: 8 },
  { id: 2, name: 'Dumplings', price: 12 },
  { id: 3, name: 'Carrot', price: 9 },
  { id: 4, name: 'Eggs', price: 5 },
  { id: 5, name: 'Ice cream', price: 10 },
  { id: 6, name: 'Apple', price: 3 },
  { id: 7, name: 'Bread', price: 2 },
  { id: 8, name: 'Fish', price: 20 },
  { id: 9, name: 'Honey', price: 15 },
  { id: 10, name: 'Jam', price: 7 },
];

export const App: React.FC = () => {
  const [products] = useState<Product[]>(initialProducts);
  const [sortType, setSortType] = useState<SortType>(SortType.Default);
  const [isReversed, setIsReversed] = useState(false);

  const sortedProducts = getSortedProducts(products, sortType);
  const visibleProducts = isReversed
    ? [...sortedProducts].reverse()
    : sortedProducts;

  return (
    <div className="container">
      <h1>Root Component</h1>

      <div className="sort-buttons">
        <button
          type="button"
          className={sortType === SortType.Name ? 'is-active' : ''}
          onClick={() => setSortType(SortType.Name)}
        >
          Sort by Name
        </button>

        <button
          type="button"
          className={sortType === SortType.Price ? 'is-active' : ''}
          onClick={() => setSortType(SortType.Price)}
        >
          Sort by Price
        </button>

        <button
          type="button"
          className={sortType === SortType.Length ? 'is-active' : ''}
          onClick={() => setSortType(SortType.Length)}
        >
          Sort by Length
        </button>

        <button
          type="button"
          className={isReversed ? 'is-active' : ''}
          onClick={() => setIsReversed(!isReversed)}
        >
          Reverse
        </button>

        <button
          type="button"
          className={sortType === SortType.Default ? 'is-active' : ''}
          onClick={() => {
            setSortType(SortType.Default);
            setIsReversed(false);
          }}
        >
          Reset
        </button>
      </div>

      <ProductList products={visibleProducts} />
    </div>
  );
};
