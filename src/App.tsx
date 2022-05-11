import React, { useState } from 'react';
import './App.css';
import GoodsList from './components/GoodsList';

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
  const [visibleGoods, setVisibleGoods] = useState([...goodsFromServer]);
  const [isVisibleList, setIsVisibleList] = useState(false);
  const [isReversed, setIsReversed] = useState(false);
  const [minLength, setMinLength] = useState(1);

  const updateVisibleList = () => {
    setIsVisibleList(!isVisibleList);
  };

  const reverseList = () => {
    if (!isReversed) {
      setIsReversed(!isReversed);
      setVisibleGoods([...visibleGoods].reverse());
    }
  };

  const sortAlphabetically = () => {
    setVisibleGoods([...visibleGoods].sort(
      (g1, g2) => g1.localeCompare(g2),
    ));
  };

  const resetList = () => {
    setVisibleGoods([...goodsFromServer]);
    setIsReversed(false);
    setMinLength(1);
  };

  const sortByLength = () => {
    setVisibleGoods([...visibleGoods].sort(
      (g1, g2) => g1.length - g2.length,
    ));
  };

  const changeLength = (value: number) => {
    setMinLength(() => value);
  };

  const filteredList = [...visibleGoods].filter(
    good => good.length >= minLength,
  );

  return (
    <div className="App">
      <h1>Goods</h1>
      <select
        onChange={
          (event) => changeLength(+event.target.value)
        }
        value={minLength}
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
      <button
        type="submit"
        onClick={updateVisibleList}
      >
        Start
      </button>
      <button
        type="submit"
        onClick={reverseList}
      >
        Reverse
      </button>
      <button
        type="submit"
        onClick={sortAlphabetically}
      >
        Sort alphabetically
      </button>
      <button
        type="submit"
        onClick={sortByLength}
      >
        Sort by length
      </button>
      <button
        type="submit"
        onClick={resetList}
      >
        Reset
      </button>
      {isVisibleList
        && <GoodsList goods={filteredList} />}
    </div>
  );
};

export default App;
