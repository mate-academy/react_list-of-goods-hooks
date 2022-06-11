import React, { useState } from 'react';

type Props = {
  goods: string[],
};

export const List:React.FC<Props> = ({ goods }) => {
  const [products, setProduct] = useState([...goods]);
  const [sortBy, setSortBy] = useState('');

  const reverseGoods = () => {
    setProduct(current => [...current].reverse());
  };

  const universalSort = () => {
    setProduct(current => [...current]
      .sort((product1: string, product2: string): number => {
        switch (sortBy) {
          case 'alphabet':
            return product1.localeCompare(product2);

          case 'length':
            return product1.length - product2.length;

          default:
            return 0;
        }
      }));
  };

  const reset = () => {
    setProduct(goods);
    setSortBy('');
  };

  return (
    <div className="main">

      <h1>
        Goods
      </h1>

      <ul>
        {products.map(good => (
          <li key={good}>
            {good}
          </li>
        ))}
      </ul>

      <div>

        <button
          type="button"
          onClick={() => {
            reverseGoods();
          }}
        >
          Reverse
        </button>

        <button
          type="button"
          onClick={() => {
            setSortBy('alphabet');
            universalSort();
          }}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          onClick={reset}
        >
          Reset
        </button>

        <button
          type="button"
          onClick={() => {
            setSortBy('length');
            universalSort();
          }}
        >
          Sort by length
        </button>

      </div>

    </div>
  );
};
