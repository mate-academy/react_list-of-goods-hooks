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

  const reverseList = () => {
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

  const chooseLength = (event: React.ChangeEvent<HTMLSelectElement>): void => {
    const newGoods = [...goodsFromServer];

    newGoods.length = +event.target.value;

    setGoods(newGoods);
  };

  return (
    <div className="App buttons">
      <h1>Goods</h1>
      <Button clicked={togling} name="START" />
      <Button clicked={reversing} name="Reverse" />
      <Button clicked={sortAlphabet} name="Sort alphabetically" />
      <Button clicked={reseting} name="Reset" />
      <Button clicked={sortByLength} name="Sort by length" />
      <select name="length" onChange={chooseLength} className="browser-default">
        <option value="">
          Set goods length
        </option>
        {goodsFromServer.map((good, i) => (
          <option value={i + 1} key={good}>
            {i + 1}
          </option>
        ))}
      </select>
      <ul>
        {state && goods.map((good) => (
          <li key={good}>{good}</li>
        ))}
      </ul>
    </div>
  );
};

export default App;
