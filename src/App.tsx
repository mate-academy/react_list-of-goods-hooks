import React, { useState, useEffect } from 'react';
import './App.css';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
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

export const App: React.FC = () => {
  const [start, setStart] = useState(false);
  const [reverse, setReverse] = useState(false);
  const [reset, setReset] = useState(false);
  const [sortByAlphabet, setSortByAlphabet] = useState(false);
  const [sortByLength, setSortByLength] = useState(false);

  useEffect(() => {
    if (sortByLength) {
      setSortByAlphabet(false);
    }
  }, [sortByLength]);

  useEffect(() => {
    if (sortByAlphabet) {
      setSortByLength(false);
    }
  }, [sortByAlphabet]);

  useEffect(() => {
    setSortByAlphabet(false);
    setSortByLength(false);
    setReverse(false);
  }, [reset]);

  const goods = [...goodsFromServer];

  if (sortByAlphabet) {
    goods.sort((good1, good2) => good1.localeCompare(good2));
  }

  if (sortByLength) {
    goods.sort((good1, good2) => good1.length - good2.length);
  }

  if (reverse) {
    goods.reverse();
  }

  return (

    <div className="App">
      {!start && (
        <button
          className="button"
          type="button"
          onClick={() => setStart(true)}
        >
          Start
        </button>
      )}

      {start && (
        <>
          <div className="App__button-group">
            <button
              className="button"
              type="button"
              onClick={() => setSortByAlphabet(true)}
            >
              Sort alphabetically
            </button>

            <button
              className="button"
              type="button"
              onClick={() => setSortByLength(true)}
            >
              Sort by length
            </button>

            <button
              className="button button--reverse"
              type="button"
              onClick={() => setReverse(!reverse)}
            >
              Reverse
            </button>

            <button
              className="button button--reset"
              type="button"
              onClick={() => setReset(!reset)}
            >
              Reset
            </button>
          </div>

          <ul className="Goods">
            {goods.map(good => (
              <li
                key={good}
                className="Goods__item"
              >
                {good}

              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};
