import React, { useState } from 'react';
import './App.css';

import { v4 as uuidv4 } from 'uuid';

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
  ALPHABET,
  LENGTH,
}

function getReorderedGoods(
  goods: string[],
  sortType: SortType,
  isReversed: boolean,
  wordsLength: number,
) {
  const visibleGoods = [...goods]
    .filter(goodItem => goodItem.length >= wordsLength);

  visibleGoods.sort((prev, curr) => {
    switch (sortType) {
      case SortType.ALPHABET:
        return prev.localeCompare(curr);
      case SortType.LENGTH:
        return prev.length - curr.length;
      case SortType.NONE:
      default:
        return 0;
    }
  });

  if (isReversed) {
    visibleGoods.reverse();
  }

  return visibleGoods;
}

export const App: React.FC = () => {
  const [isStarted, setStart] = useState(false);
  const [isReversed, setReverse] = useState(false);
  const [sortType, setSortType] = useState(SortType.NONE);
  const [wordsLength, setLength] = useState(1);

  const changedArray
    = getReorderedGoods(goodsFromServer, sortType, isReversed, wordsLength);

  const reset = () => {
    setSortType(SortType.NONE);
    setReverse(false);
    setLength(1);
  };

  return (
    <div className="App notification is-warning">
      {!isStarted && (
        <button
          type="button"
          className="button is-link"
          onClick={() => setStart(true)}
        >
          Start
        </button>
      )}

      {isStarted && (
        <>
          <ul className="Goods">
            {changedArray.map(goodItem => (
              <li className="Goods__item" key={uuidv4()}>
                {goodItem}
              </li>
            ))}
          </ul>

          <div className="options">
            <button
              type="button"
              className="button is-primary"
              onClick={() => setSortType(SortType.ALPHABET)}
            >
              Sort alphabetically
            </button>

            <button
              type="button"
              className="button is-primary"
              onClick={() => setSortType(SortType.LENGTH)}
            >
              Sort by length
            </button>

            <button
              type="button"
              className="button is-info"
              onClick={() => setReverse(current => !current)}
            >
              Reverse
            </button>

            <button
              type="button"
              className="button is-danger"
              onClick={reset}
            >
              Reset
            </button>
          </div>

          <div className="select is-success">
            <select
              onChange={event => setLength(+event.target.value)}
              value={wordsLength}
            >
              {[...Array(10)].map((_, index) => (
                <option value={index + 1} key={uuidv4()}>
                  {index + 1}
                </option>
              ))}
            </select>
          </div>
        </>
      )}
    </div>
  );
};
