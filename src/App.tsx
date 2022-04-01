import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import './App.css';

interface Good {
  name: string;
  id:string;
}

const goodsFromServer: Good[] = [
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
].map(good => ({
  name: good,
  id: uuidv4(),
}));

const App: React.FC = () => {
  const [goods, setGoods] = useState([...goodsFromServer]);
  const [isListVisible, setIsListVisible] = useState(false);
  const [value, setValue] = useState('1');

  const onChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setValue(e.target.value);
  };

  const sortedByAlphbet = () => {
    const sorted = [...goods].sort((a, b) => a.name.localeCompare(b.name));

    setGoods(sorted);
  };

  const sortedByLength = () => {
    const sorted = [...goods].sort((a, b) => a.name.length - b.name.length);

    setGoods(sorted);
  };

  const showList = () => {
    setIsListVisible(!isListVisible);
  };

  const reverse = () => {
    setGoods([...goods].reverse());
  };

  const reset = () => {
    setValue('1');
  };

  return (
    <div className="App">
      <button
        type="button"
        onClick={showList}
      >
        Start
      </button>

      <button
        type="button"
        onClick={reverse}
      >
        Reverse
      </button>

      <button
        type="button"
        onClick={sortedByAlphbet}
      >
        Sort Alphabetically
      </button>

      <button
        type="button"
        onClick={sortedByLength}
      >
        Sort By Length
      </button>

      <button
        type="button"
        onClick={reset}
      >
        reset
      </button>

      <select onChange={(e) => onChange(e)}>
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

      <ul>
        {goods.map(good => {
          const isVisible = good.name.length >= Number(value);

          return (
            isVisible && <li key={good.id}>{good.name}</li>
          );
        })}
      </ul>
    </div>
  );
};

export default App;
