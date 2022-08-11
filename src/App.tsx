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

export const App: React.FC = () => {
  const [isStarted, setStarted] = useState(false);
  const showGoods = () => {
    setStarted(true);
  };

  const [sortMethod, setSortMethod] = useState(0);

  const alphabetSort = () => {
    setSortMethod(SortType.ALPABET);
  };

  const lengthSort = () => {
    setSortMethod(SortType.LENGTH);
  };

  const [isReverse, setReverseMethod] = useState(false);
  const reverseSort = () => {
    setReverseMethod(current => !current);
  };

  const defaultSort = () => {
    setSortMethod(SortType.NONE);
    setReverseMethod(false);
  };

  const [minLength, setMinLength] = useState(1);
  const minLengthSort = (n:number) => {
    setMinLength(n);
  };

  function neededGoods(arr: string[]) {
    const copy = [...arr];

    copy.sort((a, b) => {
      switch (sortMethod) {
        case 1:
          return a.localeCompare(b);

        case 2:
          return a.length - b.length;

        default:
          return 0;
      }
    });

    if (isReverse) {
      copy.reverse();
    }

    return copy.filter(good => good.length >= minLength);
  }

  const goods = neededGoods(goodsFromServer);

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
            className={`button is-rounded ${sortMethod === SortType.ALPABET ? 'is-success' : ''}`}
            onClick={alphabetSort}
          >
            Sort alphabetically
          </button>

          <button
            type="button"
            className={`button is-rounded ${sortMethod === SortType.LENGTH ? 'is-success' : ''}`}
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
            {goods.map(good => (
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
