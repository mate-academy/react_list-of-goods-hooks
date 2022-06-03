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

const App: React.FC = () => {
  const [goods, setGoods] = useState(goodsFromServer);
  const [visible, setVisible] = useState(true);

  const showGoods = () => {
    setVisible(current => !current);
  };

  const resetGoods = () => {
    setGoods([...goodsFromServer]);
  };

  const reverseGoods = () => {
    setGoods(current => [...current].reverse());
  };

  const sortByAlphabet = () => {
    setGoods(current => [...current].sort((a, b) => a.localeCompare(b)));
  };

  const sortByLength = () => {
    setGoods(current => [...current].sort((a, b) => a.length - b.length));
  };

  return (
    <div className="App">
      {visible ? (
        <div className="sortList">
          <button
            type="button"
            onClick={showGoods}
            className="sortList__button"
          >
            Start
          </button>
        </div>
      ) : (
        <div className="sortList">
          <div className="sortList__buttons">
            <button
              type="button"
              onClick={sortByAlphabet}
              className="sortList__button"
            >
              Sort alphabetically
            </button>

            <button
              type="button"
              onClick={sortByLength}
              className="sortList__button"
            >
              Sort by length
            </button>

            <button
              type="button"
              onClick={reverseGoods}
              className="sortList__button"
            >
              Reverse
            </button>

            <button
              type="button"
              onClick={resetGoods}
              className="sortList__button"
            >
              Reset
            </button>
          </div>

          <div className="sortList__list">
            <ul className="goodsList">
              {goods.map((good) => (
                <li className="goodsList__item" key={good}>
                  <h4 className="goodsList__text">
                    {good}
                  </h4>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
