// import React from 'react';
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

enum SortBy {
  name,
  length,
  null,
}

const App: React.FC = () => {
  let goodsList = [...goodsFromServer];
  const [isListVisible, setStart] = useState(false);
  const [isReverse, setReverse] = useState(false);
  const [sortBy, setSortBy] = useState(SortBy.null);

  const start = () => {
    setStart(prev => !prev);
  };

  const reverse = () => {
    setReverse(prev => !prev);
  };

  const sortByName = () => {
    setSortBy(SortBy.name);
  };

  const sortByLength = () => {
    setSortBy(SortBy.length);
  };

  const reset = () => {
    setReverse(false);
    setSortBy(SortBy.null);
  };

  switch (sortBy) {
    case SortBy.name:
      goodsList.sort((good1, good2) => good1.localeCompare(good2));
      break;
    case SortBy.length:
      goodsList.sort((good1, good2) => good1.length - good2.length);
      break;
    default:
      goodsList = [...goodsFromServer];
  }

  if (isReverse) {
    goodsList.reverse();
  }

  return (
    <div className="App container.is-widescreen has-text-centered">
      {!isListVisible && (
        <button
          type="button"
          className="button is-link mt-6"
          onClick={start}
        >
          Start
        </button>
      )}

      {isListVisible && (
        <div>
          <ul className="my-5">
            {goodsList.map((good) => (
              <li key={good} className="is-size-5">
                {good}
              </li>
            ))}
          </ul>
          <div>
            <button
              type="button"
              className="button is-primary mx-5"
              onClick={reverse}
            >
              Reverse
            </button>

            <button
              type="button"
              className="button is-primary mx-5"
              onClick={sortByName}
            >
              Sort Alphabetically
            </button>

            <button
              type="button"
              className="button is-primary mx-5"
              onClick={sortByLength}
            >
              Sort By Length
            </button>

            <button
              type="button"
              className="button is-primary mx-5"
              onClick={reset}
            >
              Reset
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
