/* eslint-disable no-console */
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
  const [goods] = useState([...goodsFromServer]);
  const [listOfGoods, setListOfGoods] = useState(goods);
  const [visible, setVisible] = useState(false);
  const [length, setLength] = useState(10);
  const [sortBy, setSortBy] = useState('');
  const [reverse, setReverse] = useState(false);

  const showMyList = () => {
    setVisible(true);
  };

  const lengthSelector = (value: string) => {
    setLength(+value);
  };

  let reverseOrNot = true;

  const resetAll = () => {
    setListOfGoods(goods);
    setLength(10);
    setSortBy('');
    setReverse(false);
    reverseOrNot = true;
  };

  const changeDirection = () => {
    setReverse(reverseOrNot);
  };

  const prepereMyList = (
    array: string[],
    selectedLength: number,
    sortType: string,
    reversed: boolean,
  ) => {
    const result = [...array].filter((good: string) => (
      good.length <= selectedLength));

    switch (sortType) {
      case 'abc':
        result.sort((a: string, b: string) => (
          (a.toLowerCase()).localeCompare(b.toLowerCase())
        ));
        break;
      case 'length':
        result.sort((a: string, b: string) => (
          a.length - b.length
        ));
        break;
      default:
        break;
    }

    if (reversed === reverseOrNot) {
      result.reverse();
      reverseOrNot = !reverseOrNot;
    }

    return result;
  };

  const visibleGoods = prepereMyList(listOfGoods, length, sortBy, reverse);

  return (
    <div className="App container box">
      <h1 className="title">Goods</h1>
      {!visible
        ? (
          <button
            type="button"
            className="button is-ghost"
            onClick={showMyList}
          >
            Start
          </button>
        ) : (
          <>
            <div
              className="
                is-flex-direction-row
                is-justify-content-space-between
              "
            >
              <button
                type="button"
                className="is-rounded button is-success mg-medium"
                onClick={changeDirection}
              >
                Reverse
              </button>

              <button
                type="button"
                className="is-rounded button is-success"
                onClick={() => {
                  setSortBy('abc');
                }}
              >
                Sort alphabetically
              </button>

              <button
                type="button"
                className="is-rounded button is-success"
                onClick={() => {
                  setSortBy('length');
                }}
              >
                Sort by length
              </button>
              <div className="select is-rounded is-success">
                <select
                  name="length"
                  value={length}
                  onChange={event => {
                    lengthSelector(event.target.value);
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
              <button
                type="button"
                className="is-rounded button is-success"
                onClick={resetAll}
              >
                Reset
              </button>

            </div>
            <ul>
              {visibleGoods.map((good: string) => (
                <li key={good} className="is-size-3">{good}</li>
              ))}
            </ul>
          </>
        )}
    </div>
  );
};

export default App;
