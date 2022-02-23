import React, { useState } from 'react';
import './App.css';
import classNames from 'classnames';
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
  const [start, setStart] = useState(false);
  const [revers, setRevers] = useState(false);
  const [typeSort, setTypeSort] = useState('none');
  const [fildSize, setFildSize] = useState(goodsFromServer.length);

  function reset() {
    setRevers(false);
    setTypeSort('none');
    setFildSize(goodsFromServer.length);
  }

  return (
    <div className="App bg-info">
      <div className="App-wrap">
        {!start && (
          <button className="btn bg-primary btn-my" type="button" onClick={() => setStart(true)}>Start</button>
        )}
        {start && (
          <div>
            <h1 className="card-title">Goods</h1>
            <div className="App-goods-wrap">
              <GoodsList
                data={goodsFromServer}
                revers={revers}
                typeSort={typeSort}
                fildSize={fildSize}
              />
            </div>

            <p>{`List length ${fildSize}`}</p>

            <div className="btn-wrap">

              <button
                className={classNames(
                  'btn',
                  { 'btn-success': revers },
                )}
                type="button"
                onClick={() => {
                  setRevers(!revers);
                }}
              >
                Is reverse
              </button>

              <button
                className={classNames(
                  'btn',
                  { 'btn-success': typeSort === 'alfabet' },
                )}
                type="button"
                onClick={() => {
                  setTypeSort('alfabet');
                }}
              >
                Alfabet
              </button>

              <button
                className={classNames(
                  'btn',
                  { 'btn-success': typeSort === 'length' },
                )}
                type="button"
                onClick={() => {
                  setTypeSort('length');
                }}
              >
                Length
              </button>

              <button
                className="btn bg-primary"
                type="button"
                onClick={() => {
                  reset();
                }}
              >
                Reset
              </button>
            </div>

            <select
              className="form-select"
              value={fildSize}
              onChange={(event) => {
                setFildSize(+event.target.value);
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
        )}
      </div>
    </div>
  );
};

export default App;
