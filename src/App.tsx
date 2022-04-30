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

const App: React.FC = () => {
  const [isVisible, setVisibility] = useState(false);
  const [sortedBy, setSortBy] = useState('none');
  const [isReversed, setIsReversed] = useState(false);
  const [minLength, setLength] = useState(1);

  const filteredList = goodsFromServer.filter(g => g.length >= minLength);

  const reset = () => {
    setIsReversed(false);
    setLength(1);
  };

  filteredList.sort((a, b) => {
    switch (sortedBy) {
      case 'abc':
        return a.localeCompare(b);
      case 'length':
        return a.length - b.length;
      default:
        return 0;
    }
  });

  if (isReversed) {
    filteredList.reverse();
  }

  return (
    <div className="App">
      <h1 className="App__title">
        Goods
        {' '}
        {goodsFromServer.length}
      </h1>

      {isVisible
        ? (
          <>
            <div className="App__buttons">
              <button
                type="button"
                className="App__button"
                onClick={() => {
                  setIsReversed(!isReversed);
                }}
              >
                Reverse
              </button>

              <button
                type="button"
                className="App__button"
                onClick={() => {
                  setSortBy('abc');
                }}
              >
                Sort alphabetically
              </button>

              <button
                type="button"
                className="App__button"
                onClick={() => {
                  return setSortBy('length');
                }}
              >
                Sort by length
              </button>

              <button
                type="button"
                className="App__button"
                onClick={reset}
              >
                Reset
              </button>

            </div>

            <span className="App__button-description">
              Set length:
            </span>

            <select
              name="setLength"
              id="setLength"
              value={minLength}
              onChange={({ target }) => {
                setLength(+target.value);
              }}
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

            <ul className="App__list">
              {filteredList.map(item => (
                <li key={item} className="App__item">
                  {item}
                </li>
              ))}
            </ul>

          </>
        )
        : (
          <button
            type="button"
            className="App__button"
            onClick={() => setVisibility(true)}
          >
            Start
          </button>
        )}
    </div>
  );
};

export default App;
