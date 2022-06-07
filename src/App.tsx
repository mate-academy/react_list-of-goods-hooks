import React, { useState } from 'react';
import './App.scss';

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

const numArr: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const App: React.FC = () => {
  const [visibleGoods, setListOFGoods] = useState(false);
  const [copyArrGoods, setCopyArrGoods] = useState([...goodsFromServer]);
  const [selectValue, setSelectValue] = useState(1);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectValue(Number(e.target.value));
    setCopyArrGoods([...goodsFromServer]
      .filter(good => good.length <= Number(e.target.value)));
  };

  const resetList = () => {
    setCopyArrGoods([...goodsFromServer]);
    setSelectValue(1);
  };

  return (
    <div className="App">
      { !visibleGoods && (
        <button
          type="button"
          onClick={() => (setListOFGoods(true))}
          className="button is-primary"
        >
          Start
        </button>
      )}

      { visibleGoods && (
        <div className="App__buttons">
          <button
            type="button"
            onClick={() => (setCopyArrGoods([...copyArrGoods].reverse()))}
            className="button is-primary is-outlined"
          >
            Reverse
          </button>
          <button
            type="button"
            onClick={() => (setCopyArrGoods([...copyArrGoods].sort()))}
            className="button is-link is-outlined"
          >
            Sort alphabetically
          </button>
          <button
            type="button"
            onClick={() => (
              setCopyArrGoods([...copyArrGoods]
                .sort((a, b) => a.length - b.length)))}
            className="button is-link is-outlined"
          >
            Sort by length
          </button>
          <div className="select is-success">
            <select
              name="select"
              onChange={(e) => (handleChange(e))}
              value={selectValue}
            >
              {numArr.map(item => (
                <option
                  key={item}
                  value={item}
                >
                  {'Filter by world length  '}
                  {item}
                </option>
              ))}
            </select>
          </div>
          <button
            type="button"
            onClick={resetList}
            className="button is-danger is-outlined"
          >
            Reset
          </button>
        </div>
      )}

      { visibleGoods && (
        <div>
          <h1 className="App__title">
            Goods list:
          </h1>
          <ul>
            {copyArrGoods.map(good => (
              <li className="App__item" key={good}>{good}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default App;
