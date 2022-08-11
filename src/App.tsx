import React, { useState } from 'react';
import './App.css';
import { nanoid } from 'nanoid';

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

enum SortType {
  NONE,
  ALPABET,
  LENGTH,
}

function getReorderedGoods(
  goods: string[],
  sortType: SortType,
  isReversed: boolean,
) {
  const visibleGoods = [...goods];

  switch (sortType) {
    case SortType.ALPABET:
      visibleGoods.sort((a, b) => a.localeCompare(b));
      break;
    case SortType.LENGTH:
      visibleGoods.sort((a, b) => a.length - b.length);
      break;
    default:
      break;
  }

  return isReversed ? visibleGoods.reverse() : visibleGoods;
}

export const App: React.FC = () => {
  const [sortType, setType] = useState(SortType.NONE);
  const [isReversed, setReverse] = useState(false);
  const [isStarted, setStarted] = useState(false);
  const newGoods = getReorderedGoods(
    goodsFromServer,
    sortType,
    isReversed,
  );

  return (
    <div className="App panel">
      {!isStarted && (
        <button
          type="button"
          className="button is-success"
          onClick={() => {
            setStarted(true);
          }}
        >
          Start
        </button>
      )}
      {isStarted && (
        <>
          <button
            type="button"
            className="button is-success"
            onClick={() => {
              setType(SortType.ALPABET);
            }}
          >
            Sort alphabetically
          </button>

          <button
            type="button"
            className="button is-success"
            onClick={() => {
              setType(SortType.LENGTH);
            }}
          >
            Sort by length
          </button>

          <button
            type="button"
            className="button is-warning"
            onClick={() => {
              setReverse(curr => !curr);
            }}
          >
            Reverse
          </button>

          <button
            type="button"
            className="button is-danger"
            onClick={() => {
              setType(SortType.NONE);
              setReverse(false);
            }}
          >
            Reset
          </button>

          <ul className="Goods">
            {newGoods.map(good => (
              <li className="Goods__item" key={nanoid()}>{good}</li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};
