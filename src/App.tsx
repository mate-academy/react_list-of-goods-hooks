import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';

type Goods = string[];

export const goodsFromServer = [
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

const sortByLength = (arr: Goods) => {
  return arr.toSorted((a: string, b: string) => {
    return a.length - b.length;
  });
};

const sortAlphabetically = (arr: Goods) => {
  return arr.toSorted();
};

export const App: React.FC = () => {
  const [goods, setGoods] = useState<Goods>(goodsFromServer);

  const handleSortAlphabettically = () => {
    setGoods((g: Goods) => {
      return sortAlphabetically(g);
    });
  };

  const handleSortByLength = () => {
    setGoods((g: Goods) => {
      return sortByLength(g);
    });
  };

  const handleReverse = () => {
    setGoods((g: Goods) => {
      return [...g].reverse();
    });
  };

  const handleReset = () => {
    setGoods(goodsFromServer);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className="button is-info is-light"
          onClick={handleSortAlphabettically}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className="button is-success is-light"
          onClick={handleSortByLength}
        >
          Sort by length
        </button>

        <button
          type="button"
          className="button is-warning is-light"
          onClick={handleReverse}
        >
          Reverse
        </button>

        <button
          type="button"
          className="button is-danger is-light"
          onClick={handleReset}
        >
          Reset
        </button>
      </div>

      <ul>
        <ul>
          {goods.map(it => {
            return (
              <li key={it} data-cy="Good">
                {it}
              </li>
            );
          })}
        </ul>
      </ul>
    </div>
  );
};
