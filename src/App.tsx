import { useState } from 'react';
import './App.css';
import { v4 as uuid } from 'uuid';

const goodsFromServer = [
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
  ALPHABET,
  LENGTH,
}

function getReorderedGoods(
  goods: string[],
  sortType: SortType,
  isReversed: boolean,
) {
  const visibleGoods = [...goods];

  switch (sortType) {
    case SortType.ALPHABET:
      visibleGoods.sort((a, b) => a.localeCompare(b));
      break;
    case SortType.LENGTH:
      visibleGoods.sort((a, b) => a.length - b.length);
      break;
    default:
      break;
  }

  if (isReversed) {
    visibleGoods.reverse();
  }

  return visibleGoods;
}

export function App() {
  const [isStarted, setStarted] = useState(false);
  const [isReversed, setReversed] = useState(false);
  const [sortType, setType] = useState(SortType.NONE);

  const goods = getReorderedGoods(goodsFromServer, sortType, isReversed);

  return (
    <div className="App">
      {!isStarted && (
        <button
          type="button"
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
            onClick={() => {
              setType(SortType.ALPHABET);
            }}
          >
            Sort alphabetically
          </button>

          <button
            type="button"
            onClick={() => {
              setType(SortType.LENGTH);
            }}
          >
            Sort by length
          </button>

          <button
            type="button"
            onClick={() => {
              setReversed(reversed => !reversed);
            }}
          >
            Reverse
          </button>

          <button
            type="button"
            onClick={() => {
              setReversed(false);
              setType(SortType.NONE);
            }}
          >
            Reset
          </button>

          <ul className="Goods">
            {goods.map(good => (
              <li className="Goods__item" key={uuid()}>
                {good}
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
