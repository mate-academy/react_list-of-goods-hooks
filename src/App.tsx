import React, { useState } from 'react';
import './App.scss';

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
  const [listIsVisible, setListVisibility] = useState(false);
  const [sortType, setSortType] = useState('');
  const [isReversed, setReverse] = useState(false);

  const sortAlphabetically = () => setSortType('alphabet');

  const sortByLength = () => setSortType('length');

  const reset = () => {
    setSortType('');
    setReverse(false);
  };

  const list = [...goodsFromServer];

  switch (sortType) {
    case 'alphabet':
      list.sort((good1, good2) => good1.localeCompare(good2));
      break;

    case 'length':
      list.sort((good1, good2) => good2.length - good1.length);
      break;

    default:
      break;
  }

  if (isReversed === true) {
    list.reverse();
  }

  return (
    <div className="App">
      {listIsVisible === false
        ? (
          <button
            className="App__start"
            type="button"
            onClick={() => setListVisibility(true)}
          >
            Start
          </button>
        )
        : (
          <div className="App__container">
            <div className="App__container-buttons">
              <button
                className="App__container-button"
                type="button"
                onClick={() => sortAlphabetically()}
              >
                Sort alphabetically
              </button>

              <button
                className="App__container-button"
                type="button"
                onClick={() => sortByLength()}
              >
                Sort by length
              </button>

              <button
                className="App__container-button"
                type="button"
                onClick={() => setReverse(!isReversed)}
              >
                Reverse
              </button>

              <button
                className="App__container-button"
                type="button"
                onClick={() => reset()}
              >
                Reset
              </button>
            </div>

            <ul className="App__goods">
              {list.map(good => (
                <li
                  className="App__good"
                  key={good}
                >
                  {good}
                </li>
              ))}
            </ul>
          </div>
        )}
    </div>
  );
};
