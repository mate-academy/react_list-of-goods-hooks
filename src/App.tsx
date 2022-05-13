import React, { useState } from 'react';
import './App.scss';
import { GoodsList } from './components/GoodsList/GoodsList';

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
  const minLength = 1;
  const [isStarted, setIsStarted] = useState(false);
  const [lengthValue, setLengthValue] = useState(minLength);
  const [goods, setGoods] = useState([...goodsFromServer]);

  const filteredGoods = [...goods].filter(good => good.length >= lengthValue);

  const reset = () => {
    setGoods([...goodsFromServer]);
    setLengthValue(minLength);
  };

  const reverse = () => {
    setGoods([...goods].reverse());
  };

  const sortByAlphabet = () => {
    setGoods([...goods].sort((g1, g2) => g1.localeCompare(g2)));
  };

  const sortByLength = () => {
    setGoods([...goods].sort((g1, g2) => g1.length - g2.length));
  };

  return (
    <div className="App">
      {!isStarted ? (
        <button
          type="button"
          onClick={() => setIsStarted(!isStarted)}
          className="start-button"
        >
          Start
        </button>
      ) : (
        <div className="goods">
          <GoodsList goods={filteredGoods} />
          <div className="goods__buttons">
            <button
              type="button"
              onClick={reverse}
              className="goods__button"
            >
              Reverse
            </button>

            <button
              type="button"
              onClick={sortByAlphabet}
              className="goods__button"
            >
              Sort alphabetically
            </button>

            <button
              type="button"
              onClick={reset}
              className="goods__button"
            >
              Reset
            </button>

            <button
              type="button"
              onClick={sortByLength}
              className="goods__button"
            >
              Sort by length
            </button>
          </div>

          <form className="goods__filter">
            <p>Filter by length:</p>
            <select
              onChange={(e) => setLengthValue(+e.target.value)}
              defaultValue={lengthValue}
            >
              {Array.from({ length: 10 }, (_, i) => i + 1).map(num => (
                <option
                  key={num}
                  value={num}
                  className="goods__length"
                >
                  {num}
                </option>
              ))}
            </select>
          </form>
        </div>
      )}
    </div>
  );
};

export default App;
