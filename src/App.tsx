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
  const [isVisible, setVisibeled] = useState(false);
  const [isReversed, setReversed] = useState(false);
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

    if (isReversed) {
      copyProducts.reverse();
    }

    return copyProducts;
  };

  return (
    <div className="App">
      <h1>Goods</h1>
      {!isVisible && (
        <button
          type="button"
          onClick={() => setVisibeled(true)}
        >
          Start
        </button>
      )}
      {isVisible && (
        <>
          <ProductsList products={prepareProducts()} />
          <button
            type="button"
            onClick={() => setReversed(!isReversed)}
          >
            Revers
          </button>
          <button
            type="button"
            onClick={() => setSortedBy('alphabet')}
          >
            Sort alphabetically
          </button>
          <button
            type="button"
            onClick={() => setSortedBy('length')}
          >
            Sort by length
          </button>
          <button
            type="button"
            onClick={() => {
              setReversed(false);
              setSortedBy('');
            }}
          >
            Reset
          </button>
        </>
      )}
    </div>
  );
};

export default App;
