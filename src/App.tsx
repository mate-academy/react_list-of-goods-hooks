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
  NONE,
  ALPHABET,
  LENGTH,
}

function getReorderedGoods(
  goods: string[],
  sortType: SortType,
  isReversed: boolean,
  minLength: number,
) {
  const visibleGoods = [...goods]
    .filter(good => good.length >= minLength);

  visibleGoods.sort((good1, good2) => {
    switch (sortType) {
      case SortType.ALPHABET:
        return good1.localeCompare(good2);

      case SortType.LENGTH:
        return good1.length - good2.length;

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
  const [isReversed, setRevers] = useState(false);
  const [sortType, setSortType] = useState<SortType>(SortType.NONE);
  const [minLength, setMinLength] = useState(1);

  const visibleGoods = getReorderedGoods(
    goodsFromServer,
    sortType,
    isReversed,
    minLength,
  );

  return (
    <div className="App">
      {!isStarted
        ? (
          <button
            type="button"
            onClick={() => setStart(true)}
            className="button is-success"
          >
            Start
          </button>
        ) : (
          <>
            <div className="buttons">
              <button
                type="button"
                onClick={() => setSortType(SortType.ALPHABET)}
                className="button is-primary"
              >
                Sort alphabetically
              </button>

              <button
                type="button"
                onClick={() => setSortType(SortType.LENGTH)}
                className="button is-success"
              >
                Sort by length
              </button>

              <button
                type="button"
                onClick={() => setRevers(prevState => !prevState)}
                className="button is-info"
              >
                Reverse
              </button>

              <button
                type="button"
                onClick={() => {
                  setSortType(SortType.NONE);
                  setRevers(false);
                  setMinLength(1);
                }}
                className="button is-danger"
              >
                Reset
              </button>
              <span> Select length </span>
              <select
                title="Select"
                name="minLength"
                id="minLength"
                value={minLength}
                onChange={(event) => setMinLength(+event.target.value)}
              >
                {
                  [...new Array(10)].map((item, index) => (
                    <option key={item} value={index + 1}>
                      {index + 1}
                    </option>
                  ))
                }
              </select>
            </div>

            <ul className="Goods">
              {visibleGoods.map(good => (
                <li className="Goods__item level-item" key={good}>
                  {good}
                </li>
              ))}
            </ul>
          </>
        )}
    </div>
  );
};
