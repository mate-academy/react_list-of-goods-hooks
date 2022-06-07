import React, { useState } from 'react';
import './App.scss';

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

export const App: React.FC = () => {
  const [goods, setGoods] = useState(goodsFromServer);
  const [visibleList, setVisibleList] = useState(false);

  const isVisibleList = () => {
    setVisibleList(!visibleList);
  };

  const makeReverse = () => {
    setGoods([...goods].reverse());
  };

  const makeSortAlphabet = () => {
    setGoods([...goods].sort((a, b) => a.localeCompare(b)));
  };

  const makeSortLength = () => {
    setGoods([...goods].sort((a, b) => a.length - b.length));
  };

  const makeReset = () => {
    setGoods(goodsFromServer);
  };

  return (
    <div className="App">
      <h1 className="title">Goods</h1>

      {!visibleList && (
        <button
          type="button"
          className="
            button
            is-success
            button--start
          "
          onClick={isVisibleList}
        >
          Start
        </button>
      )}

      {visibleList && (
        <ul className="list">
          <button
            type="button"
            onClick={isVisibleList}
            className="
              delete
              is-large
              button--close"
          >
            Close List
          </button>

          {goods.map((good) => (
            <li className="list-item" key={good}>
              {good}
            </li>
          ))}

          <div className="buttonWrapper">
            <button
              type="button"
              onClick={makeReverse}
              className="button is-info"
            >
              Reverse
            </button>

            <button
              type="button"
              onClick={makeSortAlphabet}
              className="button is-info"
            >
              Sort alphabetically
            </button>

            <button
              type="button"
              onClick={makeSortLength}
              className="button is-info"
            >
              Sort by length
            </button>

            <button
              type="button"
              onClick={makeReset}
              className="
                button
                is-danger
                is-light
              "
            >
              Reset
            </button>
          </div>
        </ul>
      )}
    </div>
  );
};
