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

function getReorderedGoods(
  goods: string[],
  sortType: string,
  isReversed: boolean,
) {
  const visibleGoods = [...goods];

  switch (sortType) {
    case 'LENGTH':
      visibleGoods.sort((a, b) => a.length - b.length);
      break;
    case 'ALPABET':
      visibleGoods.sort((a, b) => a.localeCompare(b));
      break;
    default:
  }

  if (isReversed) {
    visibleGoods.reverse();
  }

  return visibleGoods;
}

export const App: React.FC = () => {
  const [isReversed, setReversed] = useState(false);
  const [sortType, setSort] = useState('NONE');
  const [isStarted, setStart] = useState(false);

  const goods = getReorderedGoods(goodsFromServer, sortType, isReversed);

  return (
    <div className="App">
      {!isStarted && (
        <button
          className="button"
          type="button"
          onClick={() => setStart(true)}
        >
          Start
        </button>
      )}
      {isStarted && (
        <>
          <button type="button" onClick={() => setSort('ALPABET')}>
            Sort alphabetically
          </button>

          <button type="button" onClick={() => setSort('LENGTH')}>
            Sort by length
          </button>

          <button
            type="button"
            onClick={() => (
              setReversed((current => !current))
            )}
          >
            Reverse
          </button>

          <button
            type="button"
            onClick={() => {
              setSort('NONE');
              setReversed(false);
            }}
          >
            Reset
          </button>

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
