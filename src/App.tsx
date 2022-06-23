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

enum Goods {
  Default,
  Asc,
  Length,
}

const App: React.FC = () => {
  const goods = [...goodsFromServer];
  const [started, setStarted] = useState(false);
  const [reversed, setReversed] = useState(false);
  const [sorted, setSorted] = useState(Goods.Default);
  const [length, setLength] = useState(1);

  const options = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  const handleToStart = () => {
    setStarted(!started);
  };

  const handleToReset = () => {
    setReversed(false);
    setSorted(Goods.Default);
    setLength(1);
  };

  const sortByReverse = () => {
    setReversed(!reversed);
  };

  const sortByAscend = () => {
    setSorted(Goods.Asc);
  };

  const sortByLength = () => {
    setSorted(Goods.Length);
  };

  // const visibleGoods = goods.filter(good => good.length >= length);

  switch (sorted) {
    case Goods.Asc:
      goods.sort((firstWord, secondWord) => (
        firstWord.localeCompare(secondWord)
      ));
      break;

    case Goods.Length:
      goods.sort((firstWord, secondWord) => (
        firstWord.length - secondWord.length
      ));
      break;

    default:
      break;
  }

  if (reversed) {
    goods.reverse();
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-2">
          {
            (!started
              && (
                <button
                  type="button"
                  className="btn btn-success"
                  onClick={handleToStart}
                >
                  Start
                </button>
              )
            )
          }
        </div>

      </div>
      {(
        started
        && (
          <div className="row">
            <div className="col-md-2">
              <button
                type="button"
                className="btn btn-success"
                onClick={sortByReverse}
              >
                Reverse
              </button>
            </div>

            <div className="col-md-2">
              <button
                type="button"
                className="btn btn-success"
                onClick={sortByAscend}
              >
                Ascending
              </button>
            </div>

            <div className="col-md-2">
              <button
                type="button"
                className="btn btn-success"
                onClick={sortByLength}
              >
                By Length
              </button>
            </div>

            <div className="col-md-2">
              <button
                type="button"
                className="btn btn-success"
                onClick={handleToReset}
              >
                Reset
              </button>
            </div>

            <div className="col-md-2">
              <select
                className="form-select"
                aria-label="Default select example"
                name="length"
                value={length}
                onChange={(event) => {
                  setLength(Number(event.target.value));
                }}
              >
                <option selected hidden>--Choose--</option>
                {options.map((option) => (
                  <option
                    value={option}
                  >
                    {option}
                  </option>
                ))}
              </select>
            </div>
            <br />
            <br />
            <div className="col-md-12 text-center">
              <ul>
                {goods
                  .filter((filterGood) => filterGood.length >= length)
                  .map((good) => (
                    <li key={good} className="list-unstyled">
                      {good}
                    </li>
                  ))}
              </ul>
            </div>
          </div>
        )
      )}

    </div>
  );
};

export default App;
