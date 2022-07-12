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
  const [initialButtonVisible, start] = useState(true);
  const [isReversed, reverse] = useState(false);
  const [isSortedByLength, sortByLength] = useState(false);
  const [isSortedByName, sortByName] = useState(false);
  const [isReset, reset] = useState(false);
  const [goodsLength, setGoodsLength] = useState('1');
  const visibleGoods = goodsList.filter(good => good.length >= +goodsLength);

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
    reverse(false);
    sortByLength(false);
    sortByName(false);
    reset(false);
    setGoodsLength('1');
  }

  return (
    <div className="App">
      {!initialButtonVisible && (
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
                return (
                  sortByName(true),
                  sortByLength(false),
                  reverse(false)
                );
              }}
            >
              Sort by name
            </button>

            <button
              type="button"
              className="button is-primary is-small"
              onClick={() => {
                return (
                  sortByLength(true),
                  sortByName(false),
                  reverse(false)
                );
              }}
            >
              Sort by length
            </button>

            <button
              type="button"
              className="button is-primary is-small"
              onClick={() => {
                return (
                  reverse(!isReversed)
                );
              }}
            >
              Reverse
            </button>

            <button
              type="button"
              className="button is-primary is-small"
              onClick={() => reset(true)}
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

      {initialButtonVisible && (
        <button
          type="button"
          className="button is-primary"
          onClick={() => start(false)}
        >
          Start
        </button>
      )}
    </div>
  );
};

export default App;
