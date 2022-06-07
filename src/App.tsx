import React, { useState } from 'react';
import './App.css';
import { GoodsList } from './componets/GoodesList';

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
  const goodsCopy = [...goodsFromServer];
  const [showButton, setToggle] = useState(true);
  const [isReversed, setReverse] = useState(false);
  const [sortBy, setSort] = useState('');

  goodsCopy.sort((product1, product2) => {
    switch (sortBy) {
      case 'alphabet':
        return product1.localeCompare(product2);

      case 'length':
        return product1.length - product2.length;

      default:
        return 0;
    }
  });

  if (isReversed) {
    goodsCopy.reverse();
  }

  return (
    <div className="App">
      <h1 className="title">Goods</h1>
      {showButton
        && (
          <>
            <button
              type="button"
              onClick={() => setToggle(false)}
              className="show-button level-item button is-primary is-light"
            >
              Start
            </button>
          </>
        )}

      {!showButton
      && (
        <>
          <GoodsList goods={goodsCopy} />
          <button
            type="button"
            onClick={() => setReverse(!isReversed)}
            className="button-insert button is-primary is-light"
          >
            Reverse
          </button>
          <button
            type="button"
            onClick={() => {
              setReverse(false);
              setSort('alphabet');
            }}
            className="button-insert button is-primary is-light"
          >
            Sort alphabetically
          </button>
          <button
            type="button"
            onClick={() => {
              setReverse(false);
              setSort('');
            }}
            className="button-insert button is-primary is-light"
          >
            Reset
          </button>
          <button
            type="button"
            onClick={() => {
              setReverse(false);
              setSort('length');
            }}
            className="button-insert button is-primary is-light"
          >
            Sort by length
          </button>
        </>
      )}
    </div>
  );
};

export default App;
