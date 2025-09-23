import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';

// Tipo do produto
type Product = {
  id: number;
  name: string;
  price: number;
};

// Lista inicial
const initialProducts: Product[] = [
  { id: 1, name: 'Dumplings', price: 5 },
  { id: 2, name: 'Carrot', price: 2 },
  { id: 3, name: 'Eggs', price: 3 },
  { id: 4, name: 'Ice cream', price: 4 },
  { id: 5, name: 'Apple', price: 2 },
];

// Enum de tipos de ordenação
enum SortType {
  Default = 'DEFAULT',
  Name = 'NAME',
  Price = 'PRICE',
}

export const App: React.FC = () => {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [sortType, setSortType] = useState<SortType>(SortType.Default);
  const [newName, setNewName] = useState('');
  const [newPrice, setNewPrice] = useState<number | ''>('');

  // Adiciona novo produto
  const handleAddProduct = () => {
    if (!newName || !newPrice || newPrice <= 0) {
      return;
    }

    const newProduct: Product = {
      id: products.length > 0 ? products[products.length - 1].id + 1 : 1,
      name: newName,
      price: newPrice,
    };

    setProducts([...products, newProduct]);
    setNewName('');
    setNewPrice('');
    setSortType(SortType.Default);
  };

  // Ordena produtos
  const handleSort = (type: SortType) => {
    let sorted = [...products];

    switch (type) {
      case SortType.Name:
        sorted.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case SortType.Price:
        sorted.sort((a, b) => a.price - b.price);
        break;
      case SortType.Default:
      default:
        sorted = [
          ...initialProducts,
          ...products.filter(p => p.id > initialProducts.length),
        ];
        break;
    }

    setProducts(sorted);
    setSortType(type);
  };

  return (
    <div className="section content">
      <h1 className="title">Product Manager</h1>

      {/* Formulário */}
      <div className="field is-grouped">
        <div className="control">
          <input
            className="input"
            type="text"
            placeholder="Product name"
            value={newName}
            onChange={e => setNewName(e.target.value)}
          />
        </div>

        <div className="control">
          <input
            className="input"
            type="number"
            placeholder="Price"
            value={newPrice}
            onChange={e => setNewPrice(Number(e.target.value))}
          />
        </div>

        <div className="control">
          <button
            className="button is-primary"
            onClick={handleAddProduct}
            disabled={!newName || !newPrice || newPrice <= 0}
          >
            Add
          </button>
        </div>
      </div>

      {/* Botões de ordenação */}
      <div className="buttons mt-3">
        <button
          className={`button is-info is-light ${sortType === SortType.Name ? 'is-active' : ''}`}
          onClick={() => handleSort(SortType.Name)}
        >
          Sort by Name
        </button>

        <button
          className={`button is-success is-light ${sortType === SortType.Price ? 'is-active' : ''}`}
          onClick={() => handleSort(SortType.Price)}
        >
          Sort by Price
        </button>

        {sortType !== SortType.Default && (
          <button
            className="button is-danger is-light"
            onClick={() => handleSort(SortType.Default)}
          >
            Reset
          </button>
        )}
      </div>

      {/* Lista de produtos */}
      <table className="table is-striped is-narrow is-fullwidth mt-3">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {products.map(p => (
            <tr key={p.id}>
              <td>{p.id}</td>
              <td>{p.name}</td>
              <td>${p.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
