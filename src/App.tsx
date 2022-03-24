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
  const [isStarted, setStart] = useState(false);
  const [isReversed, setReverse] = useState(false);
  const [sortBy, setSorted] = useState('');

  const start = () => {
    setStart(!isStarted);
  };

  const reverse = () => {
    setReverse(!isReversed);
  };

  const sortByAlpha = () => {
    setSorted('alpha');
  };

  const sortByLength = () => {
    setSorted('length');
  };

  const reset = () => {
    setReverse(false);
    setSorted('');
  };

  const listForRender = () => {
    const copyGoodsList = [...goodsFromServer];

    copyGoodsList.sort((good1, good2) => {
      switch (sortBy) {
        case 'alpha':
          return good1.localeCompare(good2);

        case 'length':
          return good1.length - good2.length;

        default:
          return 0;
      }
    });

    if (isReversed) {
      copyGoodsList.reverse();
    }

    return copyGoodsList;
  };

  return (
    <div className="App">
      <h1 className="App__title">
        Goods
      </h1>

      {!isStarted ? (
        <button
          className="App__buttons"
          type="button"
          onClick={start}
        >
          Start
        </button>
      ) : (
        <>
          <ul
            className="App__goodsList"
          >
            {listForRender().map(good => (
              <li key={good}>
                {good}
              </li>
            ))}
          </ul>

          <button
            className="App__buttons"
            type="button"
            onClick={reverse}
          >
            Reverse
          </button>

          <button
            className="App__buttons"
            type="button"
            onClick={sortByAlpha}
          >
            Alpha
          </button>

          <button
            className="App__buttons"
            type="button"
            onClick={sortByLength}
          >
            Length
          </button>

          <button
            className="App__buttons"
            type="button"
            onClick={reset}
          >
            Reset
          </button>
        </>
      )}
    </div>
  );
};

export default App;
