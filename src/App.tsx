import React, { useState } from 'react';

import './App.css';

import GoodsList from './components/GoodsList';

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
  const [initialArray] = useState(goodsFromServer);
  const [isStarted, setIsStarted] = useState(false);
  const [minLength, setMinLength] = useState(1);

  const goodsState = useState(initialArray);
  const goods = goodsState[0].filter((product) => product.length >= minLength);
  const setGoods = goodsState[1];

  const sort = (sortType: string, array: string[]) => {
    return [...array].sort((first, second) => {
      switch (sortType) {
        case 'name':
          return first.localeCompare(second);

        case 'length':
          return first.length - second.length;

        default:
          return 0;
      }
    });
  };

  const onStartButtonClick = () => {
    setIsStarted(true);
  };

  const onReverseButtonClick = () => {
    setGoods([...goods].reverse());
  };

  const onSortByNameButtonClick = () => {
    setGoods(sort('name', goods));
  };

  const onSortByLengthButtonClick = () => {
    setGoods(sort('length', goods));
  };

  const onResetButtonClick = () => {
    setMinLength(1);
    setGoods(initialArray);
  };

  return (
    <div className="App">
      <div
        className="
          container
          d-flex
          flex-column
          justify-content-center
          shadow
          p-3
        "
      >
        <h1 className="display-1 text-center">Goods</h1>
        {!isStarted && (
          <div className="d-grid col-6 mx-auto">
            <button
              type="button"
              className="btn btn-primary"
              onClick={onStartButtonClick}
            >
              Start
            </button>
          </div>
        )}

        {isStarted && (
          <div className="row">
            <div className="col">
              <GoodsList goods={goods} />
            </div>

            <div className="col">
              <div
                className="
                  interactive-container
                  d-flex
                  flex-column
                  justify-content-evenly
                "
              >
                <div className="btn-group-vertical" role="group">
                  <button
                    type="button"
                    className="btn btn-primary btn-lg"
                    onClick={onReverseButtonClick}
                  >
                    Reverse
                  </button>

                  <button
                    type="button"
                    className="btn btn-primary btn-lg"
                    onClick={onSortByNameButtonClick}
                  >
                    Sort alphabetically
                  </button>

                  <button
                    type="button"
                    className="btn btn-primary btn-lg"
                    onClick={onSortByLengthButtonClick}
                  >
                    Sort by length
                  </button>

                  <button
                    type="button"
                    className="btn btn-primary btn-lg"
                    onClick={onResetButtonClick}
                  >
                    Reset
                  </button>
                </div>

                <select
                  name="minLength"
                  className="form-select"
                  onChange={({ target }) => {
                    setMinLength(+target.value);
                  }}
                >
                  {[...new Array(10)].map((_, i) => (
                    // eslint-disable-next-line react/no-array-index-key
                    <option key={i + 1} value={i + 1}>{i + 1}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
