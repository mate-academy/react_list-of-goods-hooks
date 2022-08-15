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

enum SortType {
  NONE,
  ALPABET,
  LENGTH,
}

function getSortedGoods(
  arr: string[],
  sortType: SortType,
  isReverse: boolean,
  minLength: number,
) {
  const copy = [...arr];

  switch (sortType) {
    case SortType.ALPABET:
      copy.sort((a, b) => a.localeCompare(b));
      break;
    case SortType.LENGTH:
      copy.sort((a, b) => a.length - b.length);
      break;
    case SortType.NONE:
    default:
      break;
  }

  if (isReverse) {
    copy.reverse();
  }

  return copy.filter(good => good.length >= minLength);
}

export const App: React.FC = () => {
  const [isStarted, setIsStarted] = useState(false);
  const showGoods = () => {
    setIsStarted(true);
  };

  const [sortType, setSortType] = useState(0);

  const alphabetSort = () => {
    setSortType(SortType.ALPABET);
  };

  const lengthSort = () => {
    setSortType(SortType.LENGTH);
  };

  const [isReverse, setIsReverse] = useState(false);
  const reverseSort = () => {
    setIsReverse(current => !current);
  };

  const defaultSort = () => {
    setSortType(SortType.NONE);
    setIsReverse(false);
  };

  const [minLength, setMinLength] = useState(1);
  const minLengthSort = (n:number) => {
    setMinLength(n);
  };

  const goods = getSortedGoods(goodsFromServer, sortType, isReverse, minLength);

  return (
    <div className="App">
      {!isStarted && (
        <button
          type="button"
          className="button is-success is-rounded is-fullwidth"
          onClick={showGoods}
        >
          Start
        </button>
      )}

      {isStarted && (
        <>
          <button
            type="button"
            className={`button is-rounded ${sortType === SortType.ALPABET ? 'is-success' : ''}`}
            onClick={alphabetSort}
          >
            Sort alphabetically
          </button>

          <button
            type="button"
            className={`button is-rounded ${sortType === SortType.LENGTH ? 'is-success' : ''}`}
            onClick={lengthSort}
          >
            Sort by length
          </button>

          <button
            type="button"
            className={`button is-rounded ${isReverse ? 'is-success' : ''}`}
            onClick={reverseSort}
          >
            Reverse
          </button>

          <button
            type="button"
            className="button is-rounded is-danger"
            onClick={defaultSort}
          >
            Reset
          </button>

          <ul className="Goods">
            {goods.length === 0
              ? (
                <strong>
                  No goods to show with length of word of
                  {' '}
                  {minLength}
                  {' '}
                  letters
                </strong>
              )
              : goods.map(good => (
                <li className="Goods__item" key={good}>
                  {good}
                </li>
              ))}
          </ul>

          <div className="length">
            Select minimal length of word to sort:
          </div>
          <div
            className="select"
          >
            <select
              name="maxLength"
              id="maxLength"
              value={minLength}
              onChange={(event) => minLengthSort(+event.currentTarget.value)}
            >
              {Array(10).fill(1).map((num, i) => {
                const count = num + i;

                return (
                  <option
                    value={count}
                    key={count}
                  >
                    {count}
                  </option>
                );
              })}

            </select>
          </div>
        </>
      )}
    </div>
  );
};
