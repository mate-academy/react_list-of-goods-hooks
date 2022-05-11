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
  const [isStarted, setIsStarted] = useState(false);
  const [reverse, setReverse] = useState(false);
  const [sortBy, setSortBy] = useState('');
  const [lengthValue, setLengthValue] = useState(0);

  const goods = [...goodsFromServer].filter(good => good.length >= lengthValue);
  const lengthSelector = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  const reset = () => {
    setReverse(false);
    setSortBy('');
    setLengthValue(0);
  };

  goods.sort((g1, g2) => {
    switch (sortBy) {
      case ('alphabet'):
        return g1.localeCompare(g2);

      case ('length'):
        return g1.length - g2.length;

      default:
        return 0;
    }
  });

  if (reverse) {
    goods.reverse();
  }

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
          <GoodsList goods={goods} />
          <div className="goods__buttons">
            <button
              type="button"
              onClick={() => setReverse(!reverse)}
              className="goods__button"
            >
              Reverse
            </button>

            <button
              type="button"
              onClick={() => setSortBy('alphabet')}
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
              onClick={() => setSortBy('length')}
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
              {lengthSelector.map(num => (
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
