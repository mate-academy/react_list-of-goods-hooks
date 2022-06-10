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
  None = 'none',
  Name = 'name',
  Length = 'length',
}

const App: React.FC = () => {
  const [isStarted, setStart] = useState(false);
  const [isReversed, reverse] = useState(false);
  const [sortBy, setSortBy] = useState(SortBy.None);

  let visibleGoods = [...goodsFromServer];

  switch (sortBy) {
    case SortBy.Name:
      visibleGoods = visibleGoods.sort((good1, good2) => (
        good1.localeCompare(good2)));
      break;

    case SortBy.Length:
      visibleGoods = visibleGoods.sort((good1, good2) => (
        good1.length - good2.length));
      break;

    default:
      visibleGoods = [...goodsFromServer];
  }

  if (isReversed) {
    visibleGoods.reverse();
  }

  return (
    <div className="App container.is-widescreen has-text-centered">
      <h1 className="title is-1">Goods</h1>
      {!isStarted && (
        <button
          type="button"
          className="button is-success"
          onClick={() => setStart(true)}
        >
          Start
        </button>
      )}

      <div className="is-flex is-justify-content-center mt-5">
        <button
          type="button"
          className="button is-info mx-4"
          onClick={() => reverse(!isReversed)}
        >
          Reverse
        </button>

        <button
          type="button"
          className="button is-info mx-4"
          onClick={() => setSortBy(SortBy.Name)}
        >
          Sort Alphabetically
        </button>

        <button
          type="button"
          className="button is-info mx-4"
          onClick={() => setSortBy(SortBy.Length)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className="button is-info mx-4"
          onClick={() => {
            reverse(false);
            setSortBy(SortBy.None);
          }}
        >
          Reset
        </button>
      </div>

      {isStarted && (
        <div className="mt-6">
          <h2 className="title is-2">Goods List:</h2>

          <ul>
            {visibleGoods.map(good => (
              <li key={good} className="is-size-4">
                {good}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default App;
