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
  const [isVisiable, setIsVisiable] = useState(true);
  const [goodLength, setGoodLength] = useState(1);
  const [isReversed, setIsReversed] = useState(false);

  const copyGoods = [...goods].filter(
    good => good.length >= goodLength,
  );

  const filterLength: React.ChangeEventHandler<HTMLSelectElement> = (e) => {
    const selectValue = e.target.value;

    setGoodLength(+selectValue);
  };

  if (isReversed) {
    copyGoods.reverse();
  }

  const reset = () => {
    setGoods(goodsFromServer);
    setGoodLength(1);
  };

  return (
    <div className="App">
      {isVisiable && (
        <button
          className="App__start"
          type="button"
          onClick={() => setIsVisiable(false)}
        >
          Start
        </button>
      )}
      {!isVisiable && (
        <div className="App__content">
          <h1 className="App__title">Goods</h1>
          <ul className="App__list">
            {copyGoods.map(good => (
              <li className="App__item" key={good}>
                {good}
              </li>
            ))}
          </ul>
          <div className="App__buttons">
            <button
              className="App__button"
              type="button"
              onClick={() => setIsReversed(!isReversed)}
            >
              Reverse
            </button>
            <button
              className="App__button"
              type="button"
              onClick={
                () => setGoods(copyGoods.sort((a, b) => a.localeCompare(b)))
              }
            >
              Sort alphabetically
            </button>
            <button
              className="App__button"
              type="button"
              onClick={reset}
            >
              Reset
            </button>
            <button
              className="App__button"
              type="button"
              onClick={
                () => setGoods(copyGoods.sort((a, b) => a.length - b.length))
              }
            >
              Sort by length
            </button>
            <select
              className="App__button App__button--select"
              name="select"
              onChange={filterLength}
            >
              <option value="1">
                {'Length >= 1'}
              </option>
              <option value="2">
                {'Length >= 2'}
              </option>
              <option value="3">
                {'Length >= 3'}
              </option>
              <option value="4">
                {'Length >= 4'}
              </option>
              <option value="5">
                {'Length >= 5'}
              </option>
              <option value="6">
                {'Length >= 6'}
              </option>
              <option value="7">
                {'Length >= 7'}
              </option>
              <option value="8">
                {'Length >= 8'}
              </option>
              <option value="9">
                {'Length >= 9'}
              </option>
              <option value="10">
                {'Length >= 10'}
              </option>
            </select>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
