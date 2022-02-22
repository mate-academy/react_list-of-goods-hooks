import React, { useState } from 'react';
import './App.css';
import { GoodsList } from './components/GoodsList';

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
  const [isReversed, setIsReversed] = useState(false);
  const [sortBy, setSortBy] = useState('');
  const [minLength, setMinLength] = useState(1);
  const [goods] = useState(goodsFromServer);

  const start = () => setIsStarted(true);

  const reverse = () => setIsReversed(!isReversed);

  const sortAlphabetically = () => {
    setSortBy('alphabet');
    setIsReversed(false);
  };

  const reset = () => {
    setSortBy('');
    setIsReversed(false);
    setMinLength(1);
  };

  const sortByLength = () => {
    setSortBy('length');
    setIsReversed(false);
  };

  const setLimit = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const length = +event.target.value;

    setMinLength(length);
  };

  const visibleGoods = goods.filter(
    good => good.length >= minLength,
  );

  switch (sortBy) {
    case 'alphabet':
      visibleGoods.sort();
      break;

    case 'length':
      visibleGoods.sort((a, b) => {
        const firstLength = a.length;
        const secondLength = b.length;

        return firstLength - secondLength;
      });
      break;

    default:
      break;
  }

  if (isReversed) {
    visibleGoods.reverse();
  }

  const options = Array.from(Array(10).keys());

  return (
    <div className="App">
      <h1>Goods</h1>

      {!isStarted
        ? (
          <button type="button" onClick={start}>
            Start
          </button>
        ) : (
          <>
            <GoodsList
              goods={visibleGoods}
            />

            <button type="button" onClick={reverse}>
              Reverse
            </button>

            <button type="button" onClick={sortAlphabetically}>
              Sort alphabetically
            </button>

            <button type="button" onClick={reset}>
              Reset
            </button>

            <button type="button" onClick={sortByLength}>
              Sort by length
            </button>

            <select onChange={setLimit} value={minLength}>
              {options.map((option) => (
                <option key={option} value={option + 1}>
                  {option + 1}
                </option>
              ))}
            </select>
          </>
        )}
    </div>
  );
};

export default App;
