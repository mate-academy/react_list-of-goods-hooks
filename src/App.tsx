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

export const App: React.FC = () => {
  const [goods] = useState(goodsFromServer);
  const [isVisible, setIsVisible] = useState(false);
  const [isReversed, setIsReversed] = useState(false);
  const [sortedBy, setSortedBy] = useState('');

  const reset = () => {
    setIsReversed(false);
    setSortedBy('');
  };

  const sortedGoods = () => {
    const copiedGoods = [...goods];

    copiedGoods.sort((el1, el2) => {
      switch (sortedBy) {
        case 'alphabet':
          return el1.localeCompare(el2);

        case 'length':
          return el1.length - el2.length;

        default:
          return 0;
      }
    });

    if (isReversed) {
      copiedGoods.reverse();
    }

    return copiedGoods;
  };

  return (
    <>
      <div className="App">

        {!isVisible ? (
          <button
            type="button"
            className="start-button"
            onClick={() => setIsVisible(true)}
          >
            Start
          </button>
        )

          : (
            <>
              <GoodsList goodslist={sortedGoods()} />

              <button
                type="button"
                className="reverse-button"
                onClick={() => (
                  setIsReversed(!isReversed)
                )}
              >
                Reverse
              </button>

              <button
                type="button"
                className="alphabetSortingButton"
                onClick={() => setSortedBy('alphabet')}
              >
                Sort by alphabet
              </button>

              <button
                type="button"
                className="lengthSortingButton"
                onClick={() => setSortedBy('length')}
              >
                Sort by length
              </button>

              <button
                type="button"
                className="resetButton"
                onClick={reset}
              >
                RESET
              </button>
            </>
          )}
      </div>
    </>
  );
};
