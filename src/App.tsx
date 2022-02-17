import React, { useState } from 'react';
import GoodsList from './components/GoodsList';

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

const lengthOptions = Object.keys(Array(10).fill(0));

const App: React.FC<{}> = () => {
  const [started, setStarted] = useState(false);
  const [reversed, setReversed] = useState(false);
  const [sortBy, setSortBy] = useState('default');
  const [lengthLimit, setLengthLimit] = useState(1);

  const startApp = () => setStarted(true);

  const reset = () => {
    setReversed(false);
    setSortBy('default');
    setLengthLimit(1);
  };

  const reverse = () => setReversed(!reversed);

  const sortByAlpha = () => {
    setSortBy('alpha');
  };

  const sortByLength = () => {
    setSortBy('length');
  };

  const onLengthChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setLengthLimit(+event.target.value);
  };

  const visibleGoods = goodsFromServer.filter(g => g.length >= lengthLimit);

  switch (sortBy) {
    case 'alpha':
      visibleGoods.sort((a, b) => a.localeCompare(b));
      break;

    case 'length':
      visibleGoods.sort((a, b) => a.length - b.length);
      break;

    default:
      break;
  }

  if (reversed) {
    visibleGoods.reverse();
  }

  return (
    <div className="App">
      <h1>Goods</h1>

      {!started
        ? <button type="button" onClick={startApp}>Start</button>
        : (
          <>
            <GoodsList
              goods={visibleGoods}
            />

            <button type="button" onClick={reset}>Reset</button>
            <button type="button" onClick={reverse}>Reverse</button>
            <button type="button" onClick={sortByAlpha}>Sort alphabetically</button>
            <button type="button" onClick={sortByLength}>Sort by length</button>

            <select
              name="length"
              id="length"
              value={lengthLimit}
              onChange={onLengthChange}
            >
              {lengthOptions.map(key => (
                <option value={+key + 1}>{+key + 1}</option>
              ))}
            </select>
          </>
        )}
    </div>
  );
};

export default App;
