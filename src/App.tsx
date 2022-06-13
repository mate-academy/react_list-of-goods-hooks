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

const selectValue = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const App: React.FC = () => {
  const [goods, setGoods] = useState([...goodsFromServer]);
  const [activeStart, setActiveStart] = useState(false);
  const [valueSelect, setValueSelect] = useState(1);

  return (
    <div>
      <div className={activeStart
        ? 'App'
        : 'App-start'}
      >
        <button
          type="button"
          className={activeStart
            ? 'button is-danger is-light'
            : 'button is-success is-light'}
          onClick={() => {
            return setActiveStart(!activeStart);
          }}
        >
          {activeStart
            ? 'Hide'
            : 'Start'}
        </button>

        {activeStart
          ? <GoodsList goods={goods} />
          : null}

        {activeStart
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
                onClick={() => {
                  setGoods([...goodsFromServer]);
                  setValueSelect(1);
                }}
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
                value={valueSelect}
                onChange={(event) => {
                  setValueSelect(+event.currentTarget.value);
                  setGoods([...goodsFromServer].filter(el => (
                    el.length >= +event.currentTarget.value)));
                }}
              >
                {selectValue.map(el => (
                  <option value={`${el}`}>{el}</option>
                ))}
              </select>
            </>
          )
          : null}

      </div>
    </div>

  );
};

export default App;
