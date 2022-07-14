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

enum SortBy {
  Length,
  Alphabet,
  Default,
}

export const App: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isReversed, setIsReversed] = useState(false);
  const [sortBy, setSortBy] = useState<SortBy>(SortBy.Default);
  const [minLength, setMinLength] = useState(1);
  const goods = [...goodsFromServer];

  const showGoodsList = () => {
    setIsVisible(true);
  };

  const reverseGoods = () => {
    setIsReversed(!isReversed);
  };

  const changeLength = (value: number) => {
    setMinLength(value);
  };

  const reset = () => {
    setIsReversed(false);
    setSortBy(SortBy.Default);
    setMinLength(1);
  };

  const visibleGoods = goods.filter(
    singleGoods => singleGoods.length >= minLength,
  );

  switch (sortBy) {
    case SortBy.Alphabet:
      visibleGoods.sort((a, b) => {
        return a.localeCompare(b);
      });
      break;

    case SortBy.Length:
      visibleGoods.sort((a, b) => {
        return a.length - b.length;
      });
      break;

    default:
      break;
  }

  if (isReversed) {
    visibleGoods.reverse();
  }

  return (
    <div className="App">
      <div className="container">

        {!isVisible && (
          <>
            <h1>Press the button to start</h1>

            <button
              className="btn btn-success"
              type="button"
              onClick={showGoodsList}
            >
              Start
            </button>
          </>
        )}

        {isVisible && (
          <>
            <h1>Goods List: </h1>
            <ul className="list-group list-group-flush">
              {visibleGoods.map(singleGoods => (
                <li key={singleGoods} className="list-group-item">
                  {singleGoods}
                </li>
              ))}
            </ul>

            <div className="button">
              <button
                className="btn btn-warning"
                type="button"
                onClick={reverseGoods}
              >
                Reverse
              </button>

              <button
                className="btn btn-danger"
                type="button"
                onClick={reset}
              >
                Reset
              </button>

              <button
                type="button"
                onClick={() => setSortBy(SortBy.Alphabet)}
                className="btn btn-primary"
              >
                Sort alphabetically
              </button>

              <button
                type="button"
                onClick={() => setSortBy(SortBy.Length)}
                className="btn btn-info"
              >
                Sort by length
              </button>

              <select
                className="form-select"
                value={minLength}
                onChange={({ target }) => {
                  changeLength(Number(target.value));
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
            </div>
          </>
        )}
      </div>
    </div>
  );
};
