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
  const [isVisible, setVisible] = useState(false);
  const [isReversed, setReversed] = useState(false);
  const [sortBy, setSorted] = useState('');
  const [selectedNumber, setSelected] = useState(1);

  const start = () => {
    setVisible(true);
  };

  const reverse = () => {
    setReversed(!isReversed);
  };

  const sort = () => {
    setSorted('abc');
    setReversed(false);
  };

  const sortByLength = () => {
    setSorted('length');
  };

  const reset = () => {
    setSorted('');
    setReversed(false);
    setSelected(1);
  };

  const preparedList = () => {
    const copyList = [...goodsFromServer].filter(item => item.length >= selectedNumber);

    copyList.sort((first, second) => {
      switch (sortBy) {
        case 'abc':
          return first.localeCompare(second);

        case 'length':
          return first.length - second.length;

        default:
          return 0;
      }
    });

    if (isReversed) {
      copyList.reverse();
    }

    return copyList;
  };

  return (
    <>
      <div className="App">
        <h1>Goods</h1>
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
          <>
            <ul className="list">
              {preparedList().map(good => (
                <li key={good} className="item">
                  {good}
                </li>
              ))}
            </ul>

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
              onClick={sort}
            >
              Sort
            </button>

            <button
              type="button"
              className="button"
              onClick={reset}
            >
              Reset
            </button>

            <button
              type="button"
              className="button"
              onClick={sortByLength}
            >
              Sort by length
            </button>

            <select
              className="select"
              value={selectedNumber}
              onChange={(e) => setSelected(+e.target.value)}
            >
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </>
        )}
      </div>
    </>
  );
};

export default App;
