import React, { useState } from 'react';
import './App.css';
import { GoodList } from './Components/GoodList';

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
  const [isShowList, setShowList] = useState(true);

  const startShowList = () => {
    setShowList((current) => !current);
  };

  const sortAlphabetically = () => {
    setGoods((current) => [...current]
      .sort((a, b) => a.localeCompare(b)));
  };

  const sortByLength = () => {
    setGoods((current) => [...current]
      .sort((a, b) => a.length - b.length));
  };

  const reset = () => {
    setGoods(goodsFromServer);
  };

  const reverse = () => {
    setGoods((current) => [...current].reverse());
  };

  return (
    <>
      <div className="background-main" />
      <div className="background-1" />
      <div className="background-2" />

      <div className="App">
        {isShowList ? (
          <button
            type="button"
            onClick={startShowList}
            className="button-start"
          >
            Start
          </button>
        ) : (
          <div className="App__content">
            <h1>Goods</h1>
            <div className="App__buttons">
              <button
                type="button"
                onClick={reverse}
                className="button"
              >
                Reverse
              </button>
              <button
                type="button"
                onClick={sortAlphabetically}
                className="button"
              >
                Sort alphabetically
              </button>
              <button
                type="button"
                onClick={sortByLength}
                className="button"
              >
                Sort by length
              </button>
              <button
                type="button"
                onClick={reset}
                className="button"
              >
                Reset
              </button>
            </div>

            <GoodList goods={goods} />
          </div>
        )}
      </div>
    </>
  );
};

export default App;
