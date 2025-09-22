import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
import cn from 'classnames';

// 1. Estrutura de dados: imagem agora é opcional
type Product = {
  id: string;
  name: string;
  price: number;
  age: number; // ano de lançamento ou idade em meses
  imageUrl?: string; // opcional
};

export const productsFromServer: Product[] = [
  {
    id: '1',
    name: 'iPhone 15 Pro',
    price: 1299,
    age: 2023,
  },
  {
    id: '2',
    name: 'Samsung Galaxy S23',
    price: 999,
    age: 2023,
    // sem imagem (vai usar apenas texto)
  },
  {
    id: '3',
    name: 'Google Pixel 7',
    price: 799,
    age: 2022,
  },
  {
    id: '4',
    name: 'OnePlus 10',
    price: 699,
    age: 2022,
    // sem imagem
  },
];

// 2. Enum para tipos de ordenação
enum SortType {
  Default = 'default',
  Name = 'name',
  Newest = 'newest',
  Cheapest = 'cheapest',
}

// 3. Função para preparar a lista visível
function getPreparedProducts(
  products: Product[],
  sortField: SortType,
): Product[] {
  const visibleProducts = [...products];

  visibleProducts.sort((p1, p2) => {
    switch (sortField) {
      case SortType.Name:
        return p1.name.localeCompare(p2.name);

      case SortType.Newest:
        return p2.age - p1.age; // mais novo primeiro

      case SortType.Cheapest:
        return p1.price - p2.price; // mais barato primeiro

      case SortType.Default:
      default:
        return 0;
    }
  });

  return visibleProducts;
}

export const App: React.FC = () => {
  const [sortField, setSortField] = useState<SortType>(SortType.Default);
  const [reverse, setReverse] = useState(false);

  const visibleProducts = getPreparedProducts(productsFromServer, sortField);
  const shownProducts = reverse
    ? [...visibleProducts].reverse()
    : visibleProducts;

  const handleReset = () => {
    setSortField(SortType.Default);
    setReverse(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button is-info', {
            'is-light': sortField !== SortType.Name,
          })}
          onClick={() => setSortField(SortType.Name)}
        >
          Sort by name
        </button>

        <button
          type="button"
          className={cn('button is-success', {
            'is-light': sortField !== SortType.Newest,
          })}
          onClick={() => setSortField(SortType.Newest)}
        >
          Sort by newest
        </button>

        <button
          type="button"
          className={cn('button is-primary', {
            'is-light': sortField !== SortType.Cheapest,
          })}
          onClick={() => setSortField(SortType.Cheapest)}
        >
          Sort by cheapest
        </button>

        <button
          type="button"
          className={cn('button is-warning', { 'is-light': reverse === false })}
          onClick={() => setReverse(!reverse)}
        >
          Reverse
        </button>

        {(reverse || sortField !== SortType.Default) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={handleReset}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {shownProducts.map(product => (
          <li
            key={product.id}
            className="box media"
            data-cy="Good"
            style={{ alignItems: 'center' }}
          >
            {product.imageUrl && (
              <figure className="media-left">
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  width="80"
                  height="80"
                />
              </figure>
            )}
            <div className="media-content">
              <p>
                <strong>{product.name}</strong>
              </p>
              <p>Price: ${product.price}</p>
              <p>Released: {product.age}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
