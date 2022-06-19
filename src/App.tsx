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
  default,
  name,
  length,
}

export const App: React.FC = () => {
  let goods = [...goodsFromServer];

  const [setIsVisible, setStart] = useState(false);
  const [setIsReverse, setReverse] = useState(false);
  const [sortBy, setSortBy] = useState(SortBy.default);

  const start = () => {
    setStart(prev => !prev);
  };

  const reverse = () => {
    setReverse(prev => !prev);
  };

  const sortByName = () => {
    setSortBy(SortBy.name);
  };

  const reset = () => {
    setReverse(false);
    setSortBy(SortBy.default);
  };

  const sortByLength = () => {
    setSortBy(SortBy.length);
  };

  switch (sortBy) {
    case SortBy.name:
      goods.sort((good1, good2) => good1.localeCompare(good2));
      break;
    case SortBy.length:
      goods.sort((good1, good2) => good1.length - good2.length);
      break;
    default:
      goods = [...goodsFromServer];
  }

  if (setIsReverse) {
    goods.reverse();
  }

  return (
    <div className="App container.is-widescreen has-text-centered">
      {!setIsVisible && (
        <button
          type="button"
          className="button is-link mt-6"
          onClick={start}
        >
          Start
        </button>
      )}
      {setIsVisible && (
        <div>
          <ul className="my-5">
            {goods.map((good) => (
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
