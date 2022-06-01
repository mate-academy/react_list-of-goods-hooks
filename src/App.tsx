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
  const [isVisibleToggle, setIsVisibleToggle] = useState(false);
  const [itemLength, setItemLength] = useState('1');

  const showGoods = () => {
    setIsVisibleToggle(!isVisibleToggle);
  };

  const reverse = () => {
    setGoods([...goods].reverse());
  };

  const sortByAlph = () => {
    setGoods([...goods].sort((a, b) => a.localeCompare(b)));
  };

  const sortByLength = () => {
    setGoods([...goods].sort((a, b) => a.length - b.length));
  };

  const reset = () => {
    setGoods([...goodsFromServer]);
    setItemLength('1');
  };

  return (
    <div className="App">
      {isVisibleToggle
        ? (
          <>
            <div className="App__buttons">
              <button
                type="button"
                onClick={showGoods}
                className="App__btn App__btn--uniq"
              >
                Hide
              </button>
              <button
                type="button"
                onClick={reverse}
                className="App__btn"
              >
                Reverse
              </button>
              <button
                type="button"
                onClick={sortByAlph}
                className="App__btn"
              >
                Sort alphabetically
              </button>
              <button
                type="button"
                onClick={sortByLength}
                className="App__btn"
              >
                Sort by length
              </button>
              <button
                type="button"
                onClick={reset}
                className="App__btn App__btn--uniq"
              >
                Reset
              </button>
              <select
                value={itemLength}
                onChange={event => {
                  setItemLength(event.target.value);
                }}
                className="App__select"
              >
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
                <option>6</option>
                <option>7</option>
                <option>8</option>
                <option>9</option>
                <option>10</option>
              </select>
            </div>
            <ul className="App__list">
              {goods.map(good => {
                const isVisible = good.length >= Number(itemLength);

                return (
                  isVisible
                  && (
                    <li
                      key={good}
                      className="App__list-item"
                    >
                      {good}
                    </li>
                  )
                );
              })}
            </ul>
          </>
        )
        : (
          <div className="App__start-container">
            <button
              type="button"
              onClick={showGoods}
              className="App__start-btn"
            >
              Start
            </button>
          </div>
        )}
    </div>
  );
};

export default App;
