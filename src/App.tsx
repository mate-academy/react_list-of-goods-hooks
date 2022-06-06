import React, { useState } from 'react';
import { GoodsList } from './components/GoodsList';
import './App.css';

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
  const [isVisible, setIsVisible] = useState(false);
  const [isReversed, setIsReversed] = useState(false);
  const [sortBy, setSortBy] = useState('');

  const goodsCopy = [...goodsFromServer];

  goodsCopy.sort((a, b) => {
    switch (sortBy) {
      case 'name':
        return a.localeCompare(b);
      case 'length':
        return a.length - b.length;
      default:
        return 0;
    }
  });

  if (isReversed) {
    goodsCopy.reverse();
  }

  return (
    <div className="container text-center">

      {!isVisible && (
        <button
          className="btn btn-success btn-lg"
          type="button"
          onClick={() => setIsVisible(true)}
        >
          Start
        </button>
      )}

      {isVisible && (
        <>
          <h1>Goods</h1>

          <GoodsList products={goodsCopy} />

          <div className="buttons d-flex justify-content-evenly">
            <button
              className="btn btn-warning"
              type="button"
              onClick={() => setIsReversed(current => !current)}
            >
              Reverse
            </button>

            <button
              className="btn btn-success"
              type="button"
              onClick={() => setSortBy('name')}
            >
              Sort alphabetically
            </button>

            <button
              className="btn btn-success"
              type="button"
              onClick={() => setSortBy('length')}
            >
              Sort by length
            </button>

            <button
              className="btn btn-danger"
              type="button"
              onClick={() => {
                setSortBy('');
                setIsReversed(false);
              }}
            >
              Reset
            </button>
          </div>
        </>
      )}
    </div>
  );
};
