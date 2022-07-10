import React, { useState } from 'react';
import './App.css';
import { GoodsList } from './GoodsList';

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
  const [isShown, setIsShown] = useState(false);
  const [isReversed, setIsReversed] = useState(false);
  const [sortBy, setSortBy] = useState('id');

  const visibleGoods = [...goodsFromServer];

  visibleGoods.sort((a: string, b: string): number => {
    switch (sortBy) {
      case 'alphabet': return a.localeCompare(b);
      case 'length': return a.length - b.length;
      default: return 0;
    }
  });

  if (isReversed) {
    visibleGoods.reverse();
  }

  return (
    <div className="App content">
      <h1 className="title mt-6">Goods</h1>
      {!isShown && (
        <button
          type="button"
          className="button is-info is-inverted"
          onClick={() => setIsShown(true)}
        >
          Start
        </button>
      )}

      {isShown && (
        <>
          <div className="buttons">
            <button
              type="button"
              className="button is-info is-inverted"
              onClick={() => setIsReversed(current => !current)}
            >
              Reverse
            </button>
            <button
              type="button"
              className="button is-info is-inverted"
              onClick={() => setSortBy('alphabet')}
            >
              Sort alphabetically
            </button>
            <button
              type="button"
              className="button is-info is-inverted"
              onClick={() => {
                setSortBy('id');
                setIsReversed(false);
              }}
            >
              Reset
            </button>
            <button
              type="button"
              className="button is-info is-inverted"
              onClick={() => setSortBy('length')}
            >
              Sort by length
            </button>
          </div>
          <GoodsList goods={visibleGoods} />
        </>
      )}
    </div>
  );
};

export default App;
