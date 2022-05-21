import React, { useState } from 'react';
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

const App: React.FC = () => {
  const [goods, setGoods] = useState(goodsFromServer);
  const [isHidden, setIsHidden] = useState(false);

  const setHidden = () => {
    setIsHidden(true);
  };

  const reverse = () => {
    setGoods(currentGoods => [...currentGoods].reverse());
  };

  const sortAlphabetically = () => {
    setGoods(currentGoods => [...currentGoods].sort(
      (good1, good2) => good1.localeCompare(good2),
    ));
  };

  const sortByLength = () => {
    setGoods(currentGoods => [...currentGoods].sort(
      (good1, good2) => good1.length - good2.length,
    ));
  };

  const reset = () => {
    setGoods(goodsFromServer);
  };

  return (
    <div className="App">
      <h1 className="title">List of goods</h1>
      <button
        type="button"
        className="button"
        hidden={isHidden}
        onClick={setHidden}
      >
        Start
      </button>
      <ul
        className="list"
        hidden={!isHidden}
      >
        {goods.map(item => (
          <li
            key={item}
            className="list__item"
          >
            {item}
          </li>
        ))}
      </ul>
      <button
        type="button"
        className="button"
        hidden={!isHidden}
        onClick={reverse}
      >
        Reverse
      </button>
      <button
        type="button"
        className="button"
        hidden={!isHidden}
        onClick={sortAlphabetically}
      >
        Sort alphabetically
      </button>
      <button
        type="button"
        className="button"
        hidden={!isHidden}
        onClick={sortByLength}
      >
        Sort by length
      </button>
      <button
        type="button"
        className="button"
        hidden={!isHidden}
        onClick={reset}
      >
        Reset
      </button>
    </div>
  );
};

export default App;
