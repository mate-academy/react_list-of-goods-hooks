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
  const [listIsVisible, setListVisibility] = useState(false);
  const [goods, setGoods] = useState([...goodsFromServer]);

  return (
    <div className="App">
      {listIsVisible === false
        ? (
          <button
            className="App__start"
            type="button"
            onClick={() => setListVisibility(true)}
          >
            Start
          </button>
        ) : (
          <div className="App__container">
            <div className="App__container-buttons">
              <button
                className="App__container-button"
                type="button"
                onClick={() => setGoods([...goodsFromServer]
                  .sort((good1, good2) => {
                    return good1.localeCompare(good2);
                  }))}
              >
                Sort alphabetically
              </button>

              <button
                className="App__container-button"
                type="button"
                onClick={() => setGoods([...goodsFromServer]
                  .sort((good1, good2) => {
                    return good1.length - good2.length;
                  }))}
              >
                Sort by length
              </button>

              <button
                className="App__container-button"
                type="button"
                onClick={() => setGoods([...goodsFromServer].reverse())}
              >
                Reverse
              </button>

              <button
                className="App__container-button"
                type="button"
                onClick={() => setGoods([...goodsFromServer])}
              >
                Reset
              </button>
            </div>

            <ul className="App__goods">
              {goods.map(good => (
                <li
                  className="App__good"
                  key={good}
                >
                  {good}
                </li>
              ))}
            </ul>
          </div>
        )}
    </div>
  );
};
