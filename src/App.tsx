import React, { useState } from 'react';
import './App.css';

import { Button } from './components/Button';

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
  const [state, setState] = useState(false);
  const [goods, setGoods] = useState(goodsFromServer);

  const togling = () => {
    setState((bool) => !bool);
  };

  const reversing = () => {
    setGoods(() => [...goods].reverse());
  };

  const sortAlphabet = () => {
    setGoods(() => [...goods].sort((a, b) => a.localeCompare(b)));
  };

  const sortByLength = () => {
    setGoods(() => [...goods].sort((a, b) => a.length - b.length));
  };

  const reseting = () => {
    setGoods(() => [...goodsFromServer]);
  };

  return (
    <div className="App">
      <h1>Goods</h1>
      <Button clicked={togling} name="START" />
      <Button clicked={reversing} name="Reverse" />
      <Button clicked={sortAlphabet} name="Sort alphabetically" />
      <Button clicked={reseting} name="Reset" />
      <Button clicked={sortByLength} name="Sort by length" />

      <ul>
        {state && goods.map((good) => (
          <li key={good}>{good}</li>
        ))}
      </ul>
    </div>
  );
};

export default App;
