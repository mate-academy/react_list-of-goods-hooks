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
  const [isShow, showGoods] = useState(true);
  const [goods, changeGoods] = useState(goodsFromServer);

  const showListOfGoods = () => {
    showGoods((current) => !current);
  };

  const reverseListOfGoods = () => {
    changeGoods((current) => [...current].reverse());
  };

  const sortByAlphabetical = () => {
    changeGoods((current) => [...current].sort((a, b) => a.localeCompare(b)));
  };

  const sortByLength = () => {
    changeGoods((current) => [...current].sort((a, b) => a.length - b.length));
  };

  const reset = () => {
    changeGoods([...goodsFromServer]);
  };

  return (
    <div className="App">
      {isShow && (
        <button
          className="button"
          type="button"
          onClick={showListOfGoods}
        >
          Start
        </button>
      )}
      <div className="goods">
        {
          !isShow && (
            <>
              <button
                onClick={reverseListOfGoods}
                type="button"
                className="button"
              >
                Reverse
              </button>

              <button
                onClick={sortByAlphabetical}
                type="button"
                className="button"
              >
                Sort alphabetically
              </button>

              <button
                onClick={sortByLength}
                type="button"
                className="button"
              >
                Sort by length
              </button>

              <button
                onClick={reset}
                type="button"
                className="button"
              >
                Reset
              </button>

              <ul className="goods__list">
                {
                  goods.map(good => (
                    <li key={good} className="goods__item">
                      {good}
                    </li>
                  ))
                }
              </ul>
            </>
          )
        }
      </div>
    </div>
  );
};

export default App;
