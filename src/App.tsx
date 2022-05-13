import React, { useState } from 'react';
import { GoodList } from './components/GoodList';
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
  const [showList, setShowList] = useState(true);
  const [goods, setGoods] = useState(goodsFromServer);

  const startShowList = () => {
    setShowList((value) => !value);
  };

  const sortAlphabetically = () => {
    setGoods((value) => [...value]
      .sort((a, b) => a.localeCompare(b)));
  };

  const sortLength = () => {
    setGoods((value) => [...value]
      .sort((a, b) => a.length - b.length));
  };

  const reverse = () => {
    setGoods((value) => [...value].reverse());
  };

  const reset = () => {
    setGoods(goodsFromServer);
  };

  return (
    <>
      <div className="App">
        {showList ? (
          <button
            className="button"
            type="button"
            onClick={startShowList}
          >
            Start
          </button>
        ) : (
          <div>
            <h1>Goods</h1>
            <GoodList goods={goods} />
            <div>
              <button
                className="button"
                type="button"
                onClick={reverse}
              >
                Reverse
              </button>
              <button
                className="button"
                type="button"
                onClick={sortAlphabetically}
              >
                Sort alphabetically
              </button>
              <button
                className="button"
                type="button"
                onClick={reset}
              >
                Reset
              </button>
              <button
                className="button"
                type="button"
                onClick={sortLength}
              >
                Sort by length
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default App;
