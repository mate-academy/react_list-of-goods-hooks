import React, { useState } from 'react';
import { ProductsList } from './ProductsList';
import './App.css';

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

const App: React.FC = () => {
  const [visible, setVisibeled] = useState(false);
  const [reversed, setReversed] = useState(false);
  const [sortedBy, setSortedBy] = useState('');

  const prepareProducts = () => {
    const copyProducts = [...goodsFromServer];

    copyProducts.sort((productA, productB) => {
      switch (sortedBy) {
        case 'alphabet':
          return productA.localeCompare(productB);
        case 'length':
          return productA.length - productB.length;
        default:
          return 0;
      }
    });

    if (reversed) {
      copyProducts.reverse();
    }

    return copyProducts;
  };

  const start = () => {
    setVisibeled(true);
  };

  const revers = () => {
    setReversed(!reversed);
  };

  const sortAlphabetically = () => {
    setSortedBy('alphabet');
  };

  const sortByLength = () => {
    setSortedBy('length');
  };

  const reset = () => {
    setReversed(false);
    setSortedBy('');
  };

  return (
    <div className="App">
      <h1>Goods</h1>
      {!visible && (
        <button
          type="button"
          onClick={start}
        >
          Start
        </button>
      )}
      {visible && (
        <>
          <ProductsList products={prepareProducts()} />
          <button
            type="button"
            onClick={revers}
          >
            Revers
          </button>
          <button
            type="button"
            onClick={sortAlphabetically}
          >
            Sort alphabetically
          </button>
          <button
            type="button"
            onClick={sortByLength}
          >
            Sort by length
          </button>
          <button
            type="button"
            onClick={reset}
          >
            Reset
          </button>
        </>
      )}
    </div>
  );
};

export default App;
