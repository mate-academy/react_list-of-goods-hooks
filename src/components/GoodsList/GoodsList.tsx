import React, { useState } from 'react';
import './GoodsList.css';

type Props = {
  goods: string[],
};

export const GoodsList:React.FC<Props> = ({ goods }) => {
  const [gooddies, setGoodies] = useState([...goods]);
  const [sortBy, setSortBy] = useState('');

  const reverseGoods = () => {
    setGoodies(current => [...current].reverse());
  };

  const universalSort = () => {
    setGoodies(current => [...current]
      .sort((l1: string, l2: string): number => {
        switch (sortBy) {
          case 'alphabet':
            return l1.localeCompare(l2);

          case 'length':
            return l1.length - l2.length;

          default:
            return 0;
        }
      }));
    };

  const reset = () => {
    setGoodies(goods);
    setSortBy('');
  };

  return (
    <div className="box">
      <h1
        className="title"
      >
        Goods
      </h1>
      <ul className="list">
        {gooddies.map(good => (
          <li key={good}>
            {good}
          </li>
        ))}
      </ul>

      <div>
        <button
          className="button is-link"
          type="button"
          onClick={() => {
            reverseGoods();
          }}
        >
          Reverse
        </button>

        <button
          className="button is-link"
          type="button"
          onClick={() => {
            setSortBy('alphabet');
            universalSort();
          }}
        >
          Sort alphabetically
        </button>

        <button
          className="button is-link"
          type="button"
          onClick={reset}
        >
          Reset
        </button>

        <button
          className="button is-link"
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
