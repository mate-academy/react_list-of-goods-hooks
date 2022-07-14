import React, { useState } from 'react';
import './App.scss';
import { GoodsList } from './components/GoodsList';

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
  const [isInitialButtonVisible, setIsInitialButtonVisible] = useState(true);
  const [isReversed, setIsReversed] = useState(false);
  const [isSortedByLength, setIsSortedByLength] = useState(false);
  const [isSortedByName, setIsSortedByName] = useState(false);
  const [isReset, setIsReset] = useState(false);
  const [goodsLength, setGoodsLength] = useState('1');
  const visibleGoods = goodsList
    .filter(good => good.length >= Number(goodsLength));

  if (isSortedByLength) {
    visibleGoods.sort((a, b) => a.length - b.length);
  }

  if (isSortedByName) {
    visibleGoods.sort((a, b) => a.localeCompare(b));
  }

  if (isReversed) {
    visibleGoods.reverse();
  }

  if (isReset) {
    setIsReversed(false);
    setIsSortedByLength(false);
    setIsSortedByName(false);
    setIsReset(false);
    setGoodsLength('1');
  }

  return (
    <div className="App">
      {!isInitialButtonVisible && (
        <div className="App__container">
          <h1 className="title has-text-centered">{`You can see ${visibleGoods.length} goods`}</h1>
          <div className="App__flex-box container">
            <GoodsList goods={visibleGoods} />
          </div>

          <div className="App__buttons buttons">
            <button
              type="button"
              className="button is-primary is-small"
              onClick={() => {
                setIsSortedByName(true);
                setIsSortedByLength(false);
                setIsReversed(false);
              }}
            >
              Sort by name
            </button>

            <button
              type="button"
              className="button is-primary is-small"
              onClick={() => {
                setIsSortedByLength(true);
                setIsSortedByName(false);
                setIsReversed(false);
              }}
            >
              Sort by length
            </button>

            <button
              type="button"
              className="button is-primary is-small"
              onClick={() => setIsReversed(!isReversed)}
            >
              Reverse
            </button>

            <button
              type="button"
              className="button is-primary is-small"
              onClick={() => setIsReset(true)}
            >
              Reset
            </button>
          </div>

          <div className="container">
            <span>Choose min length of the word </span>
            <select
              name="select"
              value={goodsLength}
              onChange={({ target }) => {
                setGoodsLength(target.value);
              }}
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
          </div>
        </div>
      )}

      {isInitialButtonVisible && (
        <button
          type="button"
          className="button is-primary"
          onClick={() => setIsInitialButtonVisible(false)}
        >
          Start
        </button>
      )}
    </div>
  );
};

export default App;
