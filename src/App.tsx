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

const lengths: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

enum SortBy {
  none,
  name,
  length,
}

const App: React.FC = () => {
  let goods = [...goodsFromServer];
  const [isStarted, setStart] = useState(false);
  const [isReversed, setReverse] = useState(false);
  const [sortBy, setSortBy] = useState(SortBy.none);
  const [selection, setSelection] = useState(1);

  const start = () => {
    setStart(current => !current);
  };

  const reverse = () => {
    setReverse(current => !current);
  };

  const sortByName = () => {
    setSortBy(SortBy.name);
  };

  const sortByLength = () => {
    setSortBy(SortBy.length);
  };

  const reset = () => {
    setReverse(false);
    setSortBy(SortBy.none);
  };

  const hideAndReset = () => {
    reset();
    start();
  };

  const filterByLength = (good: string) => good.length >= selection;

  switch (sortBy) {
    case SortBy.name:
      goods.sort((a, b) => (a.localeCompare(b)));
      break;
    case SortBy.length:
      goods.sort((a, b) => (a.length - b.length));
      break;
    default:
      (goods = [...goodsFromServer]);
  }

  if (isReversed) {
    goods.reverse();
  }

  return (
    <div className="App container">
      <div className="columns is-multiline">
        <div className="column is-full has-text-centered">
          <h1 className="title is-1">Goods</h1>
        </div>

        <div className="column is-full">
          <div className="columns">
            {!isStarted && (
              <button
                type="button"
                className="
                  button
                  is-success
                  column
                  is-half
                  is-offset-one-quarter"
                onClick={start}
              >
                Start
              </button>
            )}

            {isStarted && (
              <button
                type="button"
                className="button
                  is-danger
                  column
                  is-half
                  is-offset-one-quarter"
                onClick={hideAndReset}
              >
                Hide
              </button>
            )}
          </div>

        </div>

        <div className="column is-full">
          <div className="columns">
            <div className="column is-half is-offset-one-quarter">
              <label htmlFor="select-field">Select minimum length: </label>
              <select
                name="select-field"
                value={selection}
                onChange={(event) => {
                  setSelection(Number(event.currentTarget.value));
                }}
              >
                {lengths.map(num => (
                  <option key={num} value={num}>{num}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="column is-full">
          <div className="columns is-variable is-2">
            <button
              type="button"
              className="button is-info column"
              onClick={reverse}
            >
              Reverse
            </button>

            <button
              type="button"
              className="button is-info column"
              onClick={sortByName}
            >
              Sort Alphabetically
            </button>

            <button
              type="button"
              className="button is-info column"
              onClick={sortByLength}
            >
              Sort by Length
            </button>

            <button
              type="button"
              className="button is-warning column"
              onClick={reset}
            >
              Reset
            </button>
          </div>
        </div>

        <div className="column is-full">
          <div className="columns">
            <div className="column
              is-half
              is-offset-one-quarter
              has-text-centered"
            >
              {isStarted && (
                <ul>
                  <h2>Goods List:</h2>
                  {
                    goods
                      .filter(filterByLength)
                      .map((good) => (
                        <li key={good}>
                          {good}
                        </li>
                      ))
                  }
                </ul>
              )}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default App;
