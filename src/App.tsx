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
  const [isStarted, setStart] = useState(false);
  const [sortType, setSortType] = useState('none');
  const [isReversed, setReverse] = useState(false);
  const visibleGoods = [...goodsFromServer];

  switch (sortType === 'none') {
    case sortType === 'alpabet':
      visibleGoods.sort((a, b) => a.localeCompare(b));
      break;

    case sortType === 'length':
      visibleGoods.sort((a, b) => a.length - b.length);
      break;

    default:
  }

  if (!isReversed) {
    visibleGoods.reverse();
  }

  return (
    <div className="App">
      {!isStarted && (
        <div className="App__container">
          <h1 className="App__title">
            Press Start to load goods.
          </h1>

          <button
            type="button"
            className="button"
            onClick={() => setStart(true)}
          >
            Start
          </button>
        </div>
      )}

      {isStarted && (
        <div className="container">
          <div className="buttons">
            <button
              type="button"
              className="buttons__list"
              onClick={() => setSortType('alpabet')}
            >
              Sort alphabetically
            </button>

            <button
              type="button"
              className="buttons__list"
              onClick={() => setSortType('length')}
            >
              Sort by length
            </button>

            <button
              type="button"
              className="buttons__list"
              onClick={() => setReverse(true)}
            >
              Reverse
            </button>

            <button
              type="button"
              className="buttons__list"
              onClick={() => setReverse(false)}
            >
              Reset
            </button>
          </div>

          <div className="list-container">
            <ul className="Goods">
              {visibleGoods.map(good => (
                <li
                  className="Goods__item"
                  key={good}
                >
                  {good}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
      {/* <button type="button">
        Start
      </button> */}

      {/* <button type="button">
        Sort alphabetically
      </button>

      <button type="button">
        Sort by length
      </button>

      <button type="button">
        Reverse
      </button>

      <button type="button">
        Reset
      </button> */}

      {/* <ul className="Goods">
        <li className="Goods__item">Dumplings</li>
        <li className="Goods__item">Carrot</li>
        <li className="Goods__item">Eggs</li>
        <li className="Goods__item">...</li>
      </ul> */}
    </div>
  );

  // <div className="App">
  //   <button type="button">
  //     Start
  //   </button>

  //   <button type="button">
  //     Sort alphabetically
  //   </button>

  //   <button type="button">
  //     Sort by length
  //   </button>

  //   <button type="button">
  //     Reverse
  //   </button>

  //   <button type="button">
  //     Reset
  //   </button>

  //   <ul className="Goods">
  //     <li className="Goods__item">Dumplings</li>
  //     <li className="Goods__item">Carrot</li>
  //     <li className="Goods__item">Eggs</li>
  //     <li className="Goods__item">...</li>
  //   </ul>
  // </div>
};
