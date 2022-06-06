import React, { ChangeEvent, useState } from 'react';
import './App.css';
import { GoodsList } from './Component/GoodsList';

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

const quant = 1;

const App: React.FC = () => {
  const [goods, setGoods] = useState([...goodsFromServer]);
  const [visibility, setVisibility] = useState(false);
  const [length, setLength] = useState(quant);

  const reverse = () => {
    setGoods((currentState) => ([...currentState].reverse()));
  };

  const sortByLength = () => {
    setGoods((currentState) => ([...currentState].sort((a, b) => (
      a.length - b.length
    ))));
  };

  const sortAlphabetically = () => {
    setGoods((currentState) => ([...currentState].sort((a, b) => (
      a.localeCompare(b)
    ))));
  };

  const toggleVisibility = () => {
    setVisibility(true);
  };

  const handleSubmit = (event: ChangeEvent<HTMLSelectElement>) => {
    setLength(+event.target.value);
  };

  const reset = () => {
    setGoods([...goodsFromServer]);
    setLength(quant);
  };

  const visibleGoods = [...goods].filter(
    good => good.length >= length,
  );

  return visibility === true ? (
    <div className="App">
      <h1>Goods</h1>
      <GoodsList goods={visibleGoods} />

      <select
        name="good"
        value={length}
        onChange={handleSubmit}
      >
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(longness => (
          <option key={longness} value={longness}>
            {longness}
          </option>
        ))}
      </select>

      <button
        className="sort__button"
        type="button"
        onClick={reverse}
      >
        reverse
      </button>

      <button
        className="sort__button"
        type="button"
        onClick={sortByLength}
      >
        Sort by length
      </button>

      <button
        className="sort__button"
        type="button"
        onClick={sortAlphabetically}
      >
        Sort by Alphabet
      </button>

      <button
        className="sort__button"
        type="button"
        onClick={reset}
      >
        Reset
      </button>
    </div>
  ) : (
    <div className="wrapper">
      <button
        className="start"
        type="button"
        onClick={toggleVisibility}
      >
        Start
      </button>
    </div>
  );
};

export default App;
