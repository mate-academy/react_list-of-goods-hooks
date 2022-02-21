import React, { useState } from 'react';
import { Component } from './components/Component';
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
    setState((boolean) => !boolean);
  };

  const reverseList = () => {
    setGoods(() => [...goods].reverse());
  };

  const sortByAlphabet = () => {
    setGoods(() => [...goods].sort((a, b) => a.localeCompare(b)));
  };

  const sortByLength = () => {
    setGoods(() => [...goods].sort((a, b) => a.length - b.length));
  };

  const reset = () => {
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
      <Button clicked={reverseList} name="Reverse" />
      <Button clicked={sortByAlphabet} name="Sort alphabetically" />
      <Button clicked={reset} name="Reset" />
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
      {state && <Component goodsAfterFilter={goods} />}
    </div>
  );
};

export default App;
