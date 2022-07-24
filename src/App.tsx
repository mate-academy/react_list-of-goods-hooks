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

  switch (sortType) {
    case SortType.ALPHABET:
      visibleGoods.sort((a, b) => a.localeCompare(b));
      break;

    case SortType.LENGTH:
      visibleGoods.sort((a, b) => (a.length - b.length));
      break;

    default:
      break;
  }

  if (isReversed === true) {
    visibleGoods = visibleGoods.reverse();
  }

  return visibleGoods;
}

export const App: React.FC = () => {
  const [isStarted, setIsStarted] = useState(false);
  const [isReversed, setIsReversed] = useState(false);
  const [sortType, setSortType] = useState(SortType.NONE);

  return (
    <div className="App">
      {isStarted
        ? (
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
        )
        : (
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
        <ul className="Goods">
          {getReorderedGoods(goodsFromServer, sortType, isReversed).map(
            item => (
              <li className="Goods__item" key={item}>{item}</li>
            ),
          )}
        </ul>
      )}
    </div>
  );
};
