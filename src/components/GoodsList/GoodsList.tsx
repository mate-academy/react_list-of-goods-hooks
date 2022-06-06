import React, { useState } from 'react';
import './GoodsList.css';

type Props = {
  goods: string[],
};

export const GoodsList:React.FC<Props> = ({ goods }) => {
  const [gooddies, setGoodies] = useState([...goods]);

  const reverseGoods = () => {
    setGoodies(current => [...current].reverse());
  };

  const sort = () => {
    setGoodies(current => [...current].sort((l1, l2) => l1.localeCompare(l2)));
  };

  const reset = () => {
    setGoodies(goods);
  };

  const sortByLength = () => {
    setGoodies(current => [...current].sort((l1, l2) => l1.length - l2.length));
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
          onClick={sort}
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
          onClick={sortByLength}
        >
          Sort by length
        </button>
      </div>
    </div>
  );
};
