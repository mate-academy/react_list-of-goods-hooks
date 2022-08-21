import React, { useState } from 'react';
import './App.scss';

const goods = [
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
  const goodsClone = [...goods];
  const [isStarted, setStarted] = useState(false);
  const [isReversed, setReverse] = useState(false);
  const [sortType, setType] = useState('none');

  goodsClone.sort((good1, good2) => {
    switch (sortType) {
      case 'alpabet':
        return good1.localeCompare(good2);
      case 'length':
        return good1[sortType] - good2[sortType];
      default:
        return 0;
    }
  });

  if (isReversed) {
    goodsClone.reverse();
  }

  return (
    <div className="App">
      {!isStarted ? (
        <button
          className="App__button"
          type="button"
          onClick={() => setStarted(!isStarted)}
        >
          Start
        </button>
      ) : (
        <>
          <div className="App__button-wrapper">
            <button
              className="App__button"
              type="button"
              onClick={() => {
                setReverse(false);
                setType('alpabet');
              }}
            >
              Sort alphabetically
            </button>
            <button
              className="App__button"
              type="button"
              onClick={() => {
                setReverse(false);
                setType('length');
              }}
            >
              Sort by length
            </button>
            <button
              className="App__button"
              type="button"
              onClick={() => setReverse(!isReversed)}
            >
              Reverse
            </button>
            <button
              className="App__button"
              type="button"
              onClick={() => {
                setReverse(false);
                setType('none');
              }}
            >
              Reset
            </button>
          </div>
          <ul className="App__goods-list">
            {
              goodsClone.map(good => (
                <li
                  className="App__good"
                  key={good}
                >
                  {good}
                </li>
              ))
            }
          </ul>
        </>
      )}
    </div>
  );
};
