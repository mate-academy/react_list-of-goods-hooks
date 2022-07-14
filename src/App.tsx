import React, { useState } from 'react';
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
  const [isList, setIsList] = useState(true);
  const [isRevers, setIsRevers] = useState(false);
  const [sortBy, setSortBy] = useState('');
  const copyGoods = [...goodsFromServer];

  copyGoods.sort((good1, good2) => {
    switch (sortBy) {
      case 'Length':
        return good1.length - good2.length;
      case 'abc':
        return good1.localeCompare(good2);

      default:
        return 0;
    }
  });

  if (isRevers) {
    copyGoods.reverse();
  }

  return (
    <>
      <div className="App">
        {isList
          ? (
            <button
              className="btn"
              onClick={() => setIsList(!isList)}
              type="button"
            >
              Start
            </button>
          )
          : null}

        {!isList && (
          <>
            <button
              type="button"
              className="btn"
              onClick={() => setSortBy('abc')}
            >
              Sort alphabetically
            </button>

            <button
              type="button"
              className="btn"
              onClick={() => setSortBy('Length')}
            >
              Sort by length
            </button>

            <button
              type="button"
              className="btn"
              onClick={() => setIsRevers(!isRevers)}
            >
              Reverse
            </button>
            <button
              type="button"
              className="btn"
              onClick={() => {
                setIsRevers(false);
                setSortBy('');
              }}
            >
              Reset
            </button>

            <ul className="list">
              {copyGoods.map(good => (
                <li key={good}>{good}</li>
              ))}
            </ul>
          </>
        )}
      </div>
    </>
  );
};
