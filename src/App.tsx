import React, { useState } from 'react';
import './App.css';
import classNames from 'classnames';
import GoodsList from './Components/GoodsList/GoodsList';

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
  const [isStarted, start] = useState(false);
  const [isReversed, reverse] = useState(false);
  const [isSortedByAlph, sortByAlph] = useState(false);
  const [isSortedByLength, sortByLength] = useState(false);
  const [minLength, filterByLength] = useState(1);
  const goods = goodsFromServer.filter(good => good.length >= minLength);

  if (isSortedByAlph) {
    goods.sort((a, b) => a.localeCompare(b));
  }

  if (isSortedByLength) {
    goods.sort((a, b) => a.length - b.length);
  }

  if (isReversed) {
    goods.reverse();
  }

  return (
    <div className="App">
      <h1 className="title">Goods</h1>
      {isStarted ? (
        <>
          <GoodsList goods={goods} />

          <div className="select is-success">
            <select
              name="length"
              value={minLength}
              onChange={(event) => filterByLength(+event.target.value)}
            >
              {[...new Array(10)].map((_, i) => (
                <option value={i + 1}>{i + 1}</option>
              ))}
            </select>
          </div>

          <button
            type="button"
            onClick={() => {
              sortByLength(false);
              sortByAlph(!isSortedByAlph);
            }}
            className={classNames(
              'button is-info',
              { 'is-success': isSortedByAlph },
            )}
          >
            Sort alphabetically
          </button>

          <button
            type="button"
            onClick={() => {
              sortByAlph(false);
              sortByLength(!isSortedByLength);
            }}
            className={classNames(
              'button is-info',
              { 'is-success': isSortedByLength },
            )}
          >
            Sort by length
          </button>

          <button
            type="button"
            onClick={() => reverse(!isReversed)}
            className={classNames(
              'button is-info',
              { 'is-success': isReversed },
            )}
          >
            Reverse
          </button>

          <button
            type="button"
            onClick={() => {
              sortByLength(false);
              sortByAlph(false);
              reverse(false);
              filterByLength(1);
            }}
            className="button is-danger"
          >
            Reset
          </button>
        </>
      ) : (
        <button
          type="button"
          onClick={() => start(true)}
          className="button is-success"
        >
          Start
        </button>
      )}
    </div>
  );
};
