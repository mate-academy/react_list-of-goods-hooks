import React, { useState } from 'react';
import './App.css';
import { GoodsList } from './components/GoodsList';

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
  const [goods, setGoods] = useState([...goodsFromServer]);
  const [counter, setCounter] = useState(0);

  return (
    <div>
      <div className={counter % 2 !== 0
        ? 'App'
        : 'App-start'}
      >
        <button
          type="button"
          className={counter % 2 !== 0
            ? 'button is-danger is-light'
            : 'button is-success is-light'}
          onClick={() => {
            return setCounter(counter + 1);
          }}
        >
          {counter % 2 !== 0
            ? 'Hide'
            : 'Start'}
        </button>

        {counter % 2 !== 0
          ? <GoodsList goods={goods} />
          : null}

        {counter % 2 !== 0
          ? (
            <>
              <button
                type="button"
                className="button is-info is-light"
                onClick={() => (
                  setGoods([...goods].reverse())
                )}
              >
                Reverse
              </button>

              <button
                type="button"
                className="button is-info is-light"
                onClick={() => (
                  setGoods(() => [...goods].sort((a, b) => (
                    a.localeCompare(b))))
                )}
              >
                Sort alphabetically
              </button>

              <button
                type="button"
                className="button is-info is-light"
                onClick={() => (
                  setGoods([...goodsFromServer])
                )}
              >
                Reset
              </button>

              <button
                type="button"
                className="button is-info is-light"
                onClick={() => (
                  setGoods([...goods].sort((a, b) => (
                    a.length - b.length)))
                )}
              >
                Sort by length
              </button>
              <p>
                Choose length
              </p>
              <select
                className="select is-info"
                onChange={(event) => (
                  setGoods([...goodsFromServer].filter(el => (
                    el.length >= +event.currentTarget.value)))
                )}
              >
                <option value="1" selected>1</option>
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
          )
          : null}

      </div>
    </div>

  );
};

export default App;
