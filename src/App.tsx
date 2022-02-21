import React, { useState } from 'react';
import classNames from 'classnames';
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

const App: React.FC = () => {
  const [isVisible, setVisible] = useState(false);
  const [sortBy, setSortBy] = useState('');
  const [isReverse, setReverse] = useState(false);
  const [selectedValue, setSelectedValue] = useState(1);

  const selectValues = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  const visibleGoods = [...goodsFromServer].filter(value => value.length >= selectedValue);

  switch (sortBy) {
    case 'order':
      visibleGoods.sort();
      break;
    case 'length':
      visibleGoods.sort((a, b) => a.length - b.length);
      break;
    default:
      break;
  }

  if (isReverse) {
    visibleGoods.reverse();
  }

  const reset = () => {
    setSortBy('');
    setSelectedValue(1);
    setReverse(false);
  };

  const showHideFunc = () => {
    reset();
    setVisible(!isVisible);
  };

  return (
    <div className="App">
      <h1>Goods</h1>
      <button
        type="button"
        className="App__button"
        onClick={showHideFunc}
      >
        {isVisible ? 'Hide List' : 'Show List'}
      </button>
      <br />
      <br />
      {isVisible && (
        <>
          <button
            type="button"
            className={classNames('App__button', { App__active: isReverse })}
            onClick={() => setReverse(!isReverse)}
          >
            Reverse
          </button>
          <button
            type="button"
            className={classNames('App__button', { App__active: sortBy === 'order' })}
            onClick={() => setSortBy('order')}
          >
            Sort alphabetically
          </button>
          <button
            type="button"
            className="App__button"
            onClick={reset}
          >
            Reset
          </button>
          <button
            type="button"
            className={classNames('App__button', { App__active: sortBy === 'length' })}
            onClick={() => setSortBy('length')}
          >
            Sort by length
          </button>
          <select
            onChange={
              (event) => setSelectedValue(+event.target.value)
            }
            className="App__button"
            value={selectedValue}
          >
            {selectValues.map(value => (
              <option value={value}>{value}</option>
            ))}
          </select>

          <ul>
            {visibleGoods.map(good => (
              <li key={good}>{good}</li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default App;
