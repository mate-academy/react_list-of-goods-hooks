import React, { useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import GoodsList from './Components/GoodsList/GoodsList';

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
  Length,
  Alphabet,
  Default,
}

const App: React.FC = () => {
  const goods: string[] = [...goodsFromServer];

  const [isVisible, setVisible] = useState(false);
  const [isReversed, setReversed] = useState(false);
  const [sortBy, setSortBy] = useState<SortBy>(SortBy.Default);

  const reset = () => {
    setReversed(false);
    setSortBy(SortBy.Default);
  };

  switch (sortBy) {
    case SortBy.Length:
      goods.sort((a, b) => a.length - b.length);
      break;

    case SortBy.Alphabet:
      goods.sort((a, b) => a.localeCompare(b));
      break;

    default:
      break;
  }

  if (isReversed) {
    goods.reverse();
  }

  return (
    <div className="App position-absolute top-50 start-50 translate-middle">
      {!isVisible
        ? <button type="button" onClick={() => setVisible(true)}>Start</button>
        : (
          <>
            <h1 className="text-center">Goods</h1>

            <GoodsList goods={goods} />

            <button
              type="button"
              onClick={() => setReversed(!isReversed)}
              className="me-2 rounded"
            >
              Reverse
            </button>

            <button
              type="button"
              onClick={() => setSortBy(SortBy.Alphabet)}
              className="me-2 rounded"
            >
              Sort alphabetically
            </button>

            <button
              type="button"
              onClick={() => setSortBy(SortBy.Length)}
              className="me-2 rounded"
            >
              Sort by length
            </button>

            <button
              type="button"
              onClick={reset}
              className="me-2 rounded"
            >
              Reset
            </button>
          </>
        )}
    </div>
  );
};

export default App;
