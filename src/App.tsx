import React, { useState } from 'react';
import './App.css';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
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
    const sortedGoods = [...goodsFromServer].sort((good1, good2) => {
      switch (sortBy) {
        case 'byAlphabet':
          return good1.localeCompare(good2);

        case 'byLength':
          return good1.length - good2.length;

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
      {!start && (
        <button
          className="button"
          type="button"
          onClick={() => setStart(true)}
        >
          Start
        </button>
      )}

      {start && (
        <>
          <div className="App__button-group">
            <button
              className="button"
              type="button"
              onClick={() => sortGoods('byAlphabet')}
            >
              Sort alphabetically
            </button>

            <button
              className="button"
              type="button"
              onClick={() => sortGoods('byLength')}
            >
              Sort by length
            </button>

            <button
              className="button button--reverse"
              type="button"
              onClick={reverse}
            >
              Reverse
            </button>

            <button
              className="button button--reset"
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
