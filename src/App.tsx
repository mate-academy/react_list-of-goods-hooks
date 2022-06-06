import React, { useState } from 'react';
import './App.scss';
import 'bulma/css/bulma.min.css';

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

const lengthArray: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const App:React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [goods, setGoods] = useState([...goodsFromServer]);
  const [lengthValue, setLengthValue] = useState(1);

  const isVisibleFn = () => {
    setIsVisible(!isVisible);
  };

  const reverseGoods = () => {
    setGoods(() => [...goods].reverse());
  };

  const sortAlphabetically = () => {
    setGoods(() => [...goods].sort());
  };

  const sortByLength = () => {
    setGoods(() => [...goods]
      .sort((good1, good2) => good1.length - good2.length));
  };

  const reset = () => {
    setGoods(() => [...goodsFromServer]);
    setLengthValue(1);
  };

  const filteredGoods = goods.filter(good => good.length >= lengthValue);

  return (
    <div className="App">

      {!isVisible
          && (
            <section className="App__start">
              <button
                className="
                button is-info
                is-outlined is-medium"
                type="button"
                onClick={isVisibleFn}
              >
                Start
              </button>
              <h2 className="title is-3 has-text-white mt-5">
                press the button to start
              </h2>
            </section>
          )}

      {isVisible
        && (
          <section className="box App__section">
            <div className="App__title is-flex is-justify-content-center">
              <h1
                className="
                title is-1
                is-inline-block
                has-text-white"
              >
                GoodsList:
              </h1>
            </div>

            <div className="level-right">
              <h3 className="
                mr-4 is-size-4
                has-text-white"
              >
                min length:
              </h3>

              <div className="select is-info">
                <select
                  value={lengthValue}
                  onChange={(event) => {
                    setLengthValue(+(event.currentTarget.value));
                  }}
                >
                  {lengthArray.map(item => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <ul
              className="is-flex
              is-flex-direction-column
              is-align-items-center
              mb-5"
            >
              {filteredGoods.map(good => (
                <li
                  className="m-1"
                  key={good}
                >
                  <h3
                    className="title is-4 has-text-white mb-1"
                  >
                    {good}
                  </h3>
                </li>
              ))}
            </ul>

            <div
              className="
              buttons level
              has-background-black"
            >
              <button
                className="button is-info is-outlined"
                type="button"
                onClick={reverseGoods}
              >
                Reverse
              </button>
              <button
                className="button is-success is-outlined"
                type="button"
                onClick={sortAlphabetically}
              >
                Sort alphabetically
              </button>
              <button
                className="button is-success is-outlined"
                type="button"
                onClick={sortByLength}
              >
                Sort by length
              </button>
              <button
                className="button is-danger is-outlined"
                type="button"
                onClick={reset}
              >
                Reset
              </button>
            </div>

            <div className="App__hide ">
              <button
                className="button is-danger is-outlined mb-5"
                type="button"
                onClick={isVisibleFn}
              >
                Hide
              </button>
            </div>

          </section>
        )}
    </div>
  );
};

export default App;
