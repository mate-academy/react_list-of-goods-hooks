import React, { useState } from 'react';
import {GoodsList} from "./components/GoodsList";

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

  visibleGoods.sort((a, b) => {
    switch (sortBy) {
      case 'order':
        return a.localeCompare(b);
      case 'length':
        return a.length - b.length;
      default:
        return 0;
    }
  });

  if (isReverse) {
    visibleGoods.reverse();
  }

  const reset = () => {
    setSortBy('');
    setSelectedValue(1);
    setReverse(false);
  };

  const toggleVisibility = () => {
    reset();
    setVisible(!isVisible);
  };

  return (
    <div>
      <h1>Goods</h1>
      <button
        type="button"
        onClick={toggleVisibility}
      >
        {isVisible ? 'Hide List' : 'Show List'}
      </button>
      <br />
      <br />
      {isVisible && (
        <>
          <button
            type="button"
            onClick={() => setReverse(!isReverse)}
          >
            Reverse
          </button>
          <button
            type="button"
            onClick={() => setSortBy('order')}
          >
            Sort alphabetically
          </button>
          <button
            type="button"
            onClick={reset}
          >
            Reset
          </button>
          <button
            type="button"
            onClick={() => setSortBy('length')}
          >
            Sort by length
          </button>
          <select
            onChange={
              (event) => setSelectedValue(+event.target.value)
            }
            value={selectedValue}
          >
            {selectValues.map(value => (
              <option value={value}>{value}</option>
            ))}
          </select>
          <GoodsList visibleGoods={visibleGoods} />
        </>
      )}
    </div>
  );
};

export default App;
