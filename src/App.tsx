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
  const [isShown, setIsShown] = useState(false);
  const [goods, setGoods] = useState(goodsFromServer);
  const [length, setLength] = useState('1');

  const reverse = () => {
    setGoods([...goods].reverse().filter(good => good.length >= +length));
  };

  const sort = () => {
    setGoods([...goods]
      .sort((a, b) => a.localeCompare(b))
      .filter(good => good.length >= +length));
  };

  const reset = () => {
    setGoods(goodsFromServer);
    setLength('1');
  };

  const sortByLength = () => {
    setGoods([...goods].sort((a, b) => b.length - a.length));
  };

  return (
    <div className="App">
      {
        !isShown
          ? (
            <button
              type="button"
              className="button"
              onClick={() => setIsShown(true)}
            >
              Start
            </button>
          ) : (
            <div>
              <ul className="App__list">
                {goods.filter(good => good.length >= +length)
                  .map((product) => {
                    return (
                      <li key={product} className="App__item">
                        <span className="App__span">
                          {product}
                        </span>
                      </li>
                    );
                  })}
              </ul>

              <div className="App__tools">
                <button
                  type="button"
                  className="App__tools--button button"
                  onClick={() => reverse()}
                >
                  Reverse
                </button>
                <button
                  type="button"
                  className="App__tools--button button"
                  onClick={() => sort()}
                >
                  Sort alphabetically
                </button>
                <button
                  type="button"
                  className="App__tools--button button"
                  onClick={() => reset()}
                >
                  Reset
                </button>
                <button
                  type="button"
                  className="App__tools--button button"
                  onClick={() => sortByLength()}
                >
                  Sort by length
                </button>
              </div>
              <div className="App__select">
                <span className="App__select--title">
                  Choose length
                </span>
                <select
                  value={length}
                  onChange={event => setLength(event.target.value)}
                >
                  <option value="1">
                    1
                  </option>
                  <option value="2">
                    2
                  </option>
                  <option value="3">
                    3
                  </option>
                  <option value="4">
                    4
                  </option>
                  <option value="5">
                    5
                  </option>
                  <option value="6">
                    6
                  </option>
                  <option value="7">
                    7
                  </option>
                  <option value="8">
                    8
                  </option>
                  <option value="9">
                    9
                  </option>
                  <option value="10">
                    10
                  </option>
                </select>
              </div>
            </div>
          )
      }
    </div>
  );
};

export default App;
