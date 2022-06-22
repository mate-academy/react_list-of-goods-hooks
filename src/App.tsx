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

export const App: React.FC = () => {
  const [goodsList, changeGoodsList] = useState(goodsFromServer);
  const [startButton, changeVisibility] = useState(true);

  const showGoodsList = () => {
    changeVisibility(!startButton);
  };

  const sortListAlphabetically = () => {
    changeGoodsList([...goodsList].sort(
      (a: string, b: string) => a.localeCompare(b),
    ));
  };

  const sortListByLength = () => {
    changeGoodsList([...goodsList].sort(
      (a, b) => (a.length - b.length),
    ));
  };

  const reverseList = () => {
    changeGoodsList([...goodsList].reverse());
  };

  const resetAll = () => {
    changeGoodsList([...goodsFromServer]);
  };

  return (
    <div className="App">
      {startButton ? (
        <button
          type="button"
          onClick={showGoodsList}
          className="StartButton"
        >
          START
        </button>
      ) : (
        <div className="AppCore">
          <h1 className="Title">
            GOODS LIST:
          </h1>

          <ul className="GoodsList">
            {goodsList.map(item => (
              <li className="GoodsListItem" key={item}>
                {item}
              </li>
            ))}
          </ul>

          <div className="Buttons">
            <button
              type="button"
              onClick={sortListAlphabetically}
              className="Button"
            >
              SORT ALPHABETICALLY
            </button>

            <button
              type="button"
              onClick={sortListByLength}
              className="Button"
            >
              SORT BY LENGTH
            </button>

            <button
              type="button"
              onClick={reverseList}
              className="Button"
            >
              REVERSE
            </button>

            <button
              type="button"
              onClick={resetAll}
              className="Button"
            >
              RESET
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
