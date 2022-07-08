import React, { useState } from 'react';
import classNames from 'classnames';

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
  const [isVisible, setIsVisible] = useState(false);
  const [isReversed, setIsReversed] = useState(false);
  const [isSorted, setIsSorted] = useState(false);
  const [sortBy, setSortBy] = useState('');
  const [minLength, setMinLength] = useState(1);
  const goods = goodsFromServer;

  const showGoodsList = () => {
    setIsVisible(true);
  };

  const reverseGoods = () => {
    setIsReversed(!isReversed);
  };

  const sortAlphabetically = () => {
    setSortBy('alphabet');
    setIsSorted(true);
  };

  const sortByLength = () => {
    setSortBy('length');
    setIsSorted(true);
  };

  const changeMinLength = (value: number) => {
    setMinLength(value);
  };

  const reset = () => {
    setIsReversed(false);
    setSortBy('');
    setIsSorted(false);
    setMinLength(1);
  };

  const visibleGoods = goods.filter(
    singleGoods => singleGoods.length >= minLength,
  );

  if (isSorted) {
    switch (sortBy) {
      case 'alphabet':
        visibleGoods.sort((firstProduct, secondProduct) => {
          return firstProduct.localeCompare(secondProduct);
        });
        break;

      case 'length':
        visibleGoods.sort((firstProduct, secondProduct) => {
          return firstProduct.length - secondProduct.length;
        });
        break;

      default:
        break;
    }
  }

  if (isReversed) {
    visibleGoods.reverse();
  }

  return (
    <div className="App">
      <div className="container">
        <h1>Goods</h1>

        {!isVisible && (
          <button
            className="btn btn-outline-secondary"
            type="button"
            onClick={showGoodsList}
          >
            Start
          </button>
        )}

        {isVisible && (
          <>
            <ul className="list-group">
              {visibleGoods.map(singleGoods => (
                <li key={singleGoods} className="list-group-item">
                  {singleGoods}
                </li>
              ))}
            </ul>

            <div
              className="btn-group"
              role="group"
              aria-label="Basic example"
            >
              <button
                className="btn btn-outline-primary"
                type="button"
                onClick={reverseGoods}
              >
                Reverse
              </button>

              <button
                className="btn btn-outline-primary"
                type="button"
                onClick={reset}
              >
                Reset
              </button>
            </div>

            <div
              className="btn-group"
              role="group"
              aria-label="Basic example"
            >
              <button
                type="button"
                onClick={sortAlphabetically}
                className={classNames(
                  'btn',
                  {
                    'btn-primary': sortBy === 'alphabet',
                    'btn-outline-primary': sortBy !== 'alphabet',
                  },
                )}
              >
                Sort alphabetically
              </button>

              <button
                type="button"
                onClick={sortByLength}
                className={classNames(
                  'btn',
                  {
                    'btn-primary': sortBy === 'length',
                    'btn-outline-primary': sortBy !== 'length',
                  },
                )}
              >
                Sort by length
              </button>
            </div>

            <select
              className="form-select"
              aria-label="Default select example"
              value={minLength}
              onChange={({ target }) => {
                changeMinLength(Number(target.value));
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
          </>
        )}
      </div>
    </div>
  );
};

export default App;
