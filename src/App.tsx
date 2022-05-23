import React, { useState } from 'react';
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
  const [visible, setVisible] = useState(true);
  const [goods, setGoods] = useState(goodsFromServer);
  const [minLength, setMinLength] = useState(1);

  const reverse = () => {
    setGoods([...goods].reverse());
  };

  const sortByAlphabhet = () => {
    setGoods([...goods].sort((a, b) => a.localeCompare(b)));
  };

  const sortByLength = () => {
    setGoods([...goods].sort((a, b) => a.length - b.length));
  };

  const reset = () => {
    setGoods([...goodsFromServer]);
    setMinLength(1);
  };

  const renderList = goods.filter(item => item.length >= minLength);

  return (
    <div className="App">
      {visible && (
        <button
          className="App__button"
          type="button"
          onClick={() => setVisible(false)}
        >
          Start
        </button>
      )}
      <div className="App__block">
        {
          !visible && (
            <>
              <h1 className="App__title">Goods</h1>
              <div className="App__body">
                <button
                  className="App__button-menu"
                  onClick={reverse}
                  type="button"
                >
                  Reverse
                </button>
                <button
                  className="App__button-menu"
                  onClick={sortByAlphabhet}
                  type="button"
                >
                  Sort alphabetically
                </button>
                <button
                  onClick={sortByLength}
                  type="button"
                  className="App__button-menu"
                >
                  Sort by length
                </button>
                <select
                  value={minLength}
                  onChange={(event) => (
                    setMinLength(+event.target.value)
                  )}
                  className="App__selector"
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(item => (
                    <option value={item} key={item}>
                      {item}
                    </option>
                  ))}
                </select>

                <button
                  onClick={reset}
                  type="button"
                  className="App__button-menu"
                >
                  Reset
                </button>
              </div>

              <ul className="App__list">
                {renderList.map(good => (
                  <li key={good}>
                    {good}
                  </li>
                ))}
              </ul>
            </>
          )
        }
      </div>
    </div>
  );
};

export default App;
