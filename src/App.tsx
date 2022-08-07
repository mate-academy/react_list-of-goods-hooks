import React, { useState } from 'react';
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
  const [start, setStart] = useState(false);
  const [goods, setGoods] = useState([...goodsFromServer]);

  function sortGoods(sortBy: string) {
    const sortedGoods = [...goodsFromServer].sort((firstGood, secondGood) => {
      switch (sortBy) {
        case 'byAlphabet':
          return firstGood.localeCompare(secondGood);

        case 'byLength':
          return firstGood.length - secondGood.length;

        default:
          return 0;
      }
    });

    return setGoods(sortedGoods);
  }

  const reverse = () => setGoods([...goods].reverse());
  const reset = () => setGoods([...goodsFromServer]);

  return (
    <div className="App">

      {!start
        && (
          <button
            type="button"
            onClick={() => setStart(true)}
          >
            Start
          </button>
        )}

      {start
          && (
            <>
              <div>
                <button
                  type="button"
                  onClick={() => {
                    sortGoods('byAlphabet');
                  }}
                >
                  Sort alphabetically
                </button>

                <button
                  type="button"
                  onClick={() => {
                    sortGoods('byLength');
                  }}
                >
                  Sort by length
                </button>

                <button
                  type="button"
                  onClick={reverse}
                >
                  Reverse
                </button>

                <button
                  type="button"
                  onClick={reset}
                >
                  Reset
                </button>
              </div>

              <ul className="Goods">
                {goods.map(good => (
                  <li
                    key={good}
                    className="Goods__item"
                  >
                    {good}

                  </li>
                ))}
              </ul>
            </>
          )}
    </div>
  );
};
