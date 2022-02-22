import React, { useState } from 'react';
import './App.css';
import GoodsList from './GoodsList';

const goodsFromServer: string[] = [
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

const options = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

function getVisibleProduct(
  basket: string[],
  sortBy: string,
  reversed: boolean,
  selectValue: number,
): string[] {
  let visibleProduct = [];

  switch (sortBy) {
    case 'alphabet':
      visibleProduct = [...basket].sort();
      break;

    case 'length':
      visibleProduct = [...basket].sort((a, b) => a.length - b.length);
      break;

    default: visibleProduct = [...basket];
  }

  if (reversed) {
    visibleProduct.reverse();
  }

  return visibleProduct.filter((product) => product.length >= +selectValue);
}

function App() {
  const [sortBy, setSortBy] = useState('');
  const [selectValue, setSelectValue] = useState(1);
  const [reversed, setReversed] = useState(false);
  const [basket, setBasket] = useState<string[]>([]);

  const visibleProducts = getVisibleProduct(basket, sortBy, reversed, selectValue);

  const toggleReverse = () => {
    setReversed(!reversed);
  };

  return (
    <div className="App">
      <div className="wrapper">
        <h1 className="title">
          Goods
        </h1>
      </div>
      <button
        type="button"
        onClick={() => {
          setBasket(goodsFromServer);
        }}
      >
        Start
      </button>
      <button
        type="button"
        onClick={toggleReverse}
      >
        Reverse
      </button>
      <button
        type="button"
        onClick={() => {
          setSortBy('alphabet');
        }}
      >
        Sort alphabetically
      </button>
      <button
        type="button"
        onClick={() => {
          setSortBy('');
          setSelectValue(1);
          setReversed(false);
        }}
      >
        Reset
      </button>
      <button
        type="button"
        onClick={() => {
          setSortBy('length');
        }}
      >
        Sort by length
      </button>
      <select
        value={selectValue}
        onChange={(event: React.ChangeEvent<HTMLSelectElement>) => {
          setSelectValue(+event.currentTarget.value);
        }}
      >
        {options.map(el => (
          <option
            value={`${el}`}
            key={el}
          >
            {el}
          </option>
        ))}
      </select>
      <GoodsList products={visibleProducts} />
    </div>
  );
}

export default App;
