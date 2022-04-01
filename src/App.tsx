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
    setGoods([...goodsFromServer]);
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

      {isListVisible
          && (
            <ul>
              {goods.map(good => (
                <li key={good.id}>{good.name}</li>
              ))}
            </ul>
          )}
    </div>
  );
};

export default App;
