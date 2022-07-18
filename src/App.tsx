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

enum SortType {
  NONE = 'NONE',
  ALPHABET = 'ALPHABET',
  LENGTH = 'LENGTH',
}

function getReorderedGoods(
  goods: string[],
  sortType: SortType,
  isReversed: boolean,
) {
  let visibleGoods = [...goods];

  if (sortType === SortType.ALPHABET) {
    visibleGoods.sort((a, b) => {
      return a.localeCompare(b);
    });
  }

  if (sortType === SortType.LENGTH) {
    visibleGoods.sort((a, b) => (a.length - b.length));
  }

  if (isReversed === true) {
    visibleGoods = visibleGoods.reverse();
  }

  return (
    visibleGoods.map(item => (
      <li className="Goods__item" key={item}>{item}</li>
    ))
  );
}

export const App: React.FC = () => {
  const [isStarted, setIsStarted] = useState(false);
  const [isReversed, setIsReversed] = useState(false);
  const [sortType, setSortType] = useState(SortType.NONE);

  return (
    <div className="App">
      {!isStarted && (
        <button
          type="button"
          onClick={() => {
            setIsStarted(true);
          }}
        >
          Start
        </button>
      )}

      {isStarted && (
        <>
          <button
            type="button"
            onClick={() => {
              setSortType(SortType.ALPHABET);
            }}
          >
            Sort alphabetically
          </button>

          <button
            type="button"
            onClick={() => {
              setSortType(SortType.LENGTH);
            }}
          >
            Sort by length
          </button>

          <button
            type="button"
            onClick={() => {
              setIsReversed(current => !current);
            }}
          >
            Reverse
          </button>

          <button
            type="button"
            onClick={() => {
              setIsReversed(false);
              setSortType(SortType.NONE);
            }}
          >
            Reset
          </button>
        </>
      )}

      {isStarted && (
        <ul className="Goods">
          {getReorderedGoods(goodsFromServer, sortType, isReversed)}
        </ul>
      )}
    </div>
  );
};
