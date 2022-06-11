import React, { useState } from 'react';
import './List.scss';

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

      <h1
        className="title"
      >
        Goods
      </h1>

      <ul className="list">
        {products.map(good => (
          <li key={good}>
            {good}
          </li>
        ))}
      </ul>

      <div>

        <button
          className="button"
          type="button"
          onClick={() => {
            reverseGoods();
          }}
        >
          Reverse
        </button>

        <button
          className="button"
          type="button"
          onClick={() => {
            setSortBy('alphabet');
            universalSort();
          }}
        >
          Sort alphabetically
        </button>

        <button
          className="button"
          type="button"
          onClick={reset}
        >
          Reset
        </button>

        <button
          className="button"
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
