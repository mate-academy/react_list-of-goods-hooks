import React, { useState } from 'react';
import './App.css';

interface Good {
  id: number,
  name: string,
}

const goodsFromServer: Good[] = [
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
].map((good, index: number) => ({
  id: index + 1,
  name: good,
}));

const App: React.FC = () => {
  const [isStarted, setStart] = useState(false);
  const [isReversed, setReversed] = useState(false);
  const [sortBy, SortBy] = useState('');

  const start = () => setStart(true);
  const reverse = () => setReversed(current => !current);
  const sortByName = () => SortBy('name');
  const sortByLength = () => SortBy('length');
  const reset = () => {
    setReversed(false);
    SortBy('');
  };

  const renderedGoods = [...goodsFromServer];

  renderedGoods.sort((good1, good2) => {
    switch (sortBy) {
      case 'name':
        return good1.name.localeCompare(good2.name);
      case 'length':
        return good1.name.length - good2.name.length;
      default:
        return 0;
    }
  });

  if (isReversed) {
    renderedGoods.reverse();
  }

  return (
    <div className="App">
      <h1>Goods</h1>

      {isStarted
        ? (
          <ul>
            {renderedGoods.map(good => (
              <li key={good.id}>{good.name}</li>
            ))}
          </ul>
        )
        : (
          <button
            type="button"
            onClick={start}
          >
            Start
          </button>
        )}

      <button
        type="button"
        onClick={reverse}
      >
        Reverse
      </button>

      <button
        type="button"
        onClick={sortByName}
      >
        Sort Alphabetically
      </button>

      <button
        type="button"
        onClick={sortByLength}
      >
        Sort by length
      </button>

      <button
        type="button"
        onClick={reset}
      >
        Reset
      </button>
    </div>
  );
};

export default App;
