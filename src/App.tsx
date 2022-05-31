import React, { useState } from 'react';
import './App.css';
import List from './Components/List/List';

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
  const goodsList = [...goodsFromServer];
  const [isVisible, visibleGoods] = useState(false);
  const [goods, sortGoods] = useState(goodsList);

  return (
    <div className="App">
      <h1>Goods</h1>
      <div className="controls">
        {!isVisible && (
          <button
            type="button"
            onClick={() => visibleGoods(!isVisible)}
          >
            Show goods
          </button>
        )}
      </div>

      {isVisible && (
        <>
          <button
            type="button"
            onClick={() => sortGoods(prevState => (
              [...prevState].reverse()
            ))}
          >
            Reverse
          </button>

          <button
            type="button"
            onClick={() => sortGoods(prevState => (
              [...prevState].sort()
            ))}
          >
            Sort abc
          </button>

          <button
            type="button"
            onClick={() => sortGoods((goodsList))}
          >
            Reset
          </button>

          <button
            type="button"
            onClick={() => sortGoods((prevState) => (
              [...prevState].sort((a, b) => (
                a.length - b.length
              ))
            ))}
          >
            Sort length
          </button>

          <List goods={goods} />
        </>
      )}
    </div>
  );
};

export default App;
