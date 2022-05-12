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
  const [isViseble, setViseble] = useState(false);
  const [isReversed, setReverse] = useState(false);
  const [isSortedByAlpabet, setSortAlphabet] = useState(false);
  const [isSortedByLength, setSortLength] = useState(false);
  const [isRested, setRest] = useState(false);
  const [goodLength, setGoodLength] = useState(1);

  const copyGoods = [...goods].filter((good) => good.length >= goodLength);

  if (isRested) {
    setGoods(goods);
    setReverse(false);
    setSortAlphabet(false);
    setSortLength(false);
    setRest(false);
    setGoodLength(1);
  }

  if (isSortedByAlpabet) {
    copyGoods.sort((good1, good2) => good1.localeCompare(good2));
  }

  if (isSortedByLength) {
    copyGoods.sort((good1, good2) => good1.length - good2.length);
  }

  if (isReversed) {
    copyGoods.reverse();
  }

  return (
    <div className="app">
      <h1 className="app__title">
        Goods
      </h1>
      <p className="app__text">
        {`It has in total ${goodsFromServer.length} items`}
      </p>
      {isViseble && (
        <div className="app__container">
          <ul className="app__list">
            {copyGoods.map((good) => (
              <li className="app__item" key={good}>
                {good}
              </li>
            ))}
          </ul>

          <div className="app__buttons">
            <button
              type="button"
              className="app__button"
              onClick={() => setViseble(!isViseble)}
            >
              Hide Goods
            </button>

            <button
              type="button"
              className="app__button"
              onClick={() => setReverse(!isReversed)}
            >
              Reverse
            </button>

            <button
              type="button"
              className="app__button"
              onClick={() => {
                setSortAlphabet(true);
                setSortLength(false);
                setReverse(false);
              }}
            >
              Sort alphabetically
            </button>

            <button
              type="button"
              className="app__button"
              onClick={() => {
                setSortLength(true);
                setSortAlphabet(false);
                setReverse(false);
              }}
            >
              Sort by length
            </button>

            <button
              type="button"
              className="app__button"
              onClick={() => setRest(true)}
            >
              Reset
            </button>

            <label>

              <input
                className="app__select"
                type="number"
                min="1"
                max="10"
                defaultValue="1"
                value={goodLength}
                onChange={(event) => setGoodLength(Number(event.target.value))}
              />
              &lt;select&gt;
            </label>
          </div>
        </div>
      )}

      {!isViseble && (
        <button
          type="button"
          className="button__start"
          onClick={() => setViseble(!isViseble)}
        >
          Start
        </button>
      )}
    </div>
  );
};

export default App;
