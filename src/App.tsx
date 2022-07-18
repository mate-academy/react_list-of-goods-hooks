/* eslint-disable @typescript-eslint/naming-convention */
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

enum sortType {
  NONE,
  NAME,
  LENGTH,
}

export const App: React.FC = () => {
  const visibleProduct: string[] = [...goodsFromServer];

  const [isStarted, setIsStarted] = useState(false);
  const [isReversed, setIsReversed] = useState(false);
  const [sortBy, setSortBy] = useState<sortType>(sortType.NONE);

  const reversed = () => {
    setIsReversed(!isReversed);
  };

  const reset = () => {
    setIsReversed(false);
    setSortBy(sortType.NONE);
  };

  switch (sortBy) {
    case sortType.NAME:
      visibleProduct.sort(
        (prod1, prod2) => prod1.localeCompare(prod2),
      );
      break;

    case sortType.LENGTH:
      visibleProduct.sort(
        (prod1, prod2) => prod1.length - prod2.length,
      );
      break;

    default:
      break;
  }

  if (isReversed) {
    visibleProduct.reverse();
  }

  return (
    <div className="App">
      {!isStarted && (
        <button
          type="button"
          className="button__start"
          onClick={() => setIsStarted(true)}
        >
          Start
        </button>
      )}

      {isStarted && (
        <>
          <div className="card">
            <h1 className="card__title">List of Product</h1>
            <ol className="list">
              {visibleProduct.map(product => (
                <li className="card__product" key={product}>
                  <p>{product}</p>
                </li>
              ))}
            </ol>
          </div>
          <div className="card__button">
            <button
              type="button"
              className="button"
              onClick={() => setSortBy(sortType.NAME)}
            >
              Sort by name
            </button>

            <button
              type="button"
              className="button"
              onClick={() => setSortBy(sortType.LENGTH)}
            >
              Sort by length
            </button>

            <button
              type="button"
              className="button"
              onClick={reversed}
            >
              Reverse
            </button>

            <button
              type="button"
              className="button button__reset"
              onClick={reset}
            >
              Reset
            </button>
          </div>
        </>
      )}
    </div>
  );
};
