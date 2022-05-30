import React, { useState } from 'react';

import goodsFromServer from './api/goodsFromServer.json';

import { GoodsList } from './components/GoodsList';
import './App.scss';

const App: React.FC = () => {
  const [goods, setGoods] = useState(goodsFromServer);
  const [isVisiable, setIsVisiable] = useState(true);
  const [goodLength, setGoodLength] = useState(1);
  const [isReversed, setIsReversed] = useState(false);
  const [sortBy, setSortBy] = useState('');

  const copyGoods = [...goods].filter(
    good => good.length >= goodLength,
  );

  const filterLength: React.ChangeEventHandler<HTMLSelectElement> = (e) => {
    const selectValue = e.target.value;

    setGoodLength(+selectValue);
  };

  copyGoods.sort((name1, name2) => {
    switch (sortBy) {
      case 'alph':
        return name1.localeCompare(name2);
      case 'length':
        return name1.length - name2.length;
      default:
        return 0;
    }
  });

  if (isReversed) {
    copyGoods.reverse();
  }

  const reset = () => {
    setGoods(goodsFromServer);
    setGoodLength(1);
  };

  return (
    <div className="App">
      {isVisiable && (
        <button
          className="App__start"
          type="button"
          onClick={() => setIsVisiable(false)}
        >
          Start
        </button>
      )}
      {!isVisiable && (
        <div className="App__content">
          <h1 className="App__title">Goods</h1>
          <GoodsList copyGoods={copyGoods} />
          <div className="App__buttons">
            <button
              className="App__button"
              type="button"
              onClick={() => setIsReversed(!isReversed)}
            >
              Reverse
            </button>
            <button
              className="App__button"
              type="button"
              onClick={() => setSortBy('alph')}
            >
              Sort alphabetically
            </button>
            <button
              className="App__button"
              type="button"
              onClick={reset}
            >
              Reset
            </button>
            <button
              className="App__button"
              type="button"
              onClick={() => setSortBy('length')}
            >
              Sort by length
            </button>
            <select
              className="App__button App__button--select"
              name="select"
              onChange={filterLength}
            >
              <option value="1">
                {'Length >= 1'}
              </option>
              <option value="2">
                {'Length >= 2'}
              </option>
              <option value="3">
                {'Length >= 3'}
              </option>
              <option value="4">
                {'Length >= 4'}
              </option>
              <option value="5">
                {'Length >= 5'}
              </option>
              <option value="6">
                {'Length >= 6'}
              </option>
              <option value="7">
                {'Length >= 7'}
              </option>
              <option value="8">
                {'Length >= 8'}
              </option>
              <option value="9">
                {'Length >= 9'}
              </option>
              <option value="10">
                {'Length >= 10'}
              </option>
            </select>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
