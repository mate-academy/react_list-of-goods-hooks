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
  const goods = [...goodsFromServer];
  const [isVisible, setStart] = useState(false);
  const [isReversed, setReverse] = useState(false);
  const [sortBy, setSortBy] = useState('');

  const start = () => {
    setStart(prev => !prev);
  };

  const reverse = () => {
    setReverse(prev => !prev);
  };

  const sortAlphabetically = () => {
    setSortBy('name');
  };

  const sortByLength = () => {
    setSortBy('length');
  };

  const reset = () => {
    setReverse(false);
    setSortBy('');
  };

  const goodsList: string[] = goods;

  switch (sortBy) {
    case 'name':
      goodsList.sort((first, second) => first.localeCompare(second));
      break;
    case 'length':
      goodsList.sort((first, second) => first.length
      - second.length);
      break;
    default:
      break;
  }

  if (isReversed) {
    goodsList.reverse();
  }

  return (
    <div className="container">
      {!isVisible && (
        <button
          type="button"
          className="button"
          onClick={start}
        >
          Start
        </button>
      )}

      {isVisible && (
        <div>
          <ul className="container__list">
            {goodsList.map((good) => (
              <li key={good}>
                {good}
              </li>
            ))}
          </ul>
          <div className="buttonContainer">
            <button
              type="button"
              className="button"
              onClick={reverse}
            >
              Reverse
            </button>

            <button
              type="button"
              className="button"
              onClick={sortAlphabetically}
            >
              Sort by name
            </button>

            <button
              type="button"
              className="button"
              onClick={sortByLength}
            >
              Sort by length
            </button>

            <button
              type="button"
              className="button"
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
