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

const App: React.FC<{}> = () => {
  const [started, setStarted] = useState(false);
  const [reversed, setReversed] = useState(false);
  const [sorted, setSorted] = useState(false);
  const [sortBy, setSortBy] = useState('alpha');
  const [lengthLimit, setLengthLimit] = useState(1);

  const startApp = () => setStarted(true);

  const reset = () => {
    setReversed(false);
    setSorted(false);
    setLengthLimit(1);
  };

  const reverse = () => setReversed(!reversed);

  const sortByAlpha = () => {
    setSorted(true);
    setSortBy('alpha');
  };

  const sortByLength = () => {
    setSorted(true);
    setSortBy('length');
  };

  const onLengthChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setLengthLimit(+event.target.value);
  };

  const visibleGoods = goodsFromServer.filter(g => g.length >= lengthLimit);

  if (sorted) {
    visibleGoods.sort((a, b) => {
      switch (sortBy) {
        case 'length':
          return a.length - b.length;

        case 'alpha':
          return a.localeCompare(b);

        default:
          return 0;
      }
    });
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
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </>
        )}
    </div>
  );
};

export default App;
