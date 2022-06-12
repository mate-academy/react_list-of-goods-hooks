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
  none,
  name,
  length,
}

const App: React.FC = () => {
  let goods = [...goodsFromServer];

  const [isVisible, setIsVisible] = useState(false);
  const [isReversed, setIsReversed] = useState(false);
  const [isSortedBy, setIsSortedBy] = useState(SortBy.none);

  switch (isSortedBy) {
    case SortBy.name:
      goods.sort((good1, good2) => (good1.localeCompare(good2)));
      break;

    case SortBy.length:
      goods.sort((good1, good2) => (good1.length - good2.length));
      break;

    default:
      goods = [...goods];
  }

  if (isReversed) {
    goods.reverse();
  }

  return (
    <div className="App container is-max-desktop ">
      <div>
        <h1 className="title">Goods</h1>

        {!isVisible && (
          <button
            className="button"
            type="button"
            onClick={() => setIsVisible(true)}
          >
            Start
          </button>
        )}
      </div>

      {isVisible && (
        <div className="">
          <div className="field box">
            <button
              className="button"
              type="button"
              onClick={() => setIsReversed(!isReversed)}
            >
              Reverse
            </button>

            <button
              className="button"
              type="button"
              onClick={() => setIsSortedBy(SortBy.name)}
            >
              Sort alphabetically
            </button>

            <button
              className="button"
              type="button"
              onClick={() => {
                setIsReversed(false);
                setIsSortedBy(SortBy.none);
              }}
            >
              Reset
            </button>

            <button
              className="button"
              type="button"
              onClick={() => setIsSortedBy(SortBy.length)}
            >
              Sort by length
            </button>
          </div>

          <div className="content is-medium tile box">
            <ul>
              {goods.map((good) => (
                <li>
                  {good}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
