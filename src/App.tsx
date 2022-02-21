import React, { useState } from 'react';
import './App.css';
import { GoodsList } from './Props';

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

const options = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const App: React.FC = () => {
  const [goods, setGoods] = useState<string[]>(goodsFromServer);
  const [started, setStarted] = useState(false);
  const [reversed, setReversed] = useState(false);
  const [sortedBy, setSortedBy] = useState('');
  const [curentLength, setCrentLength] = useState('1');

  let visibleGoods = goods;

  visibleGoods = goods.filter(good => good.length >= +curentLength);

  switch (sortedBy) {
    case 'Alf': visibleGoods.sort((g1, g2) => g1.localeCompare(g2));
      break;
    case 'Length': visibleGoods.sort((g1, g2) => g1.length - g2.length);
      break;

    default:
      break;
  }

  if (reversed) {
    visibleGoods.reverse();
  }

  return (
    <div className="App">
      <h1>Goods</h1>
      {(started)
        ? (
          <>
            <button
              type="button"
              onClick={() => (setReversed(!reversed))}
            >
              Reverse
            </button>
            <button
              type="button"
              onClick={() => (setSortedBy('Alf'))}
            >
              Sort
            </button>
            <button
              type="button"
              onClick={() => (setSortedBy('SortByLength'))}
            >
              SortByLength
            </button>
            <button
              type="button"
              onClick={() => {
                setGoods(goodsFromServer);
                setReversed(false);
                setSortedBy('');
                setCrentLength('1');
              }}
            >
              Reset
            </button>
            <select
              value={curentLength}
              onChange={(event) => {
                setCrentLength(event.currentTarget.value);
              }}
            >
              {options.map((el) => (
                <option value={`${el}`}>{el}</option>
              ))}
            </select>
            <GoodsList goods={visibleGoods} />
          </>
        )
        : (
          <button
            type="button"
            onClick={() => (setStarted(!started))}
          >
            Start
          </button>
        )}
    </div>
  );
};

export default App;
