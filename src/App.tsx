import React, { useState } from 'react';
import './App.scss';

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
  minLength: number,
) {
  // Not to mutate the original array
  const visibleGoods = goods.filter(good => good.length >= minLength);

  visibleGoods.sort((g1, g2) => {
    switch (sortType) {
      case SortType.ALPABET:
        return g1.localeCompare(g2);

      case SortType.LENGTH:
        return g1.length - g2.length;

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
  const [isStarted, setIsStarted] = useState(false);
  const [isReversed, setIsReversed] = useState(false);
  const [sortType, setSortType] = useState(SortType.NONE);
  const [minLength, setMinLength] = useState(1);

  const reset = () => {
    setIsReversed(false);
    setSortType(SortType.NONE);
    setMinLength(1);
  };

  const visibleGoods
    = getReorderedGoods(goodsFromServer, sortType, isReversed, minLength);

  return (
    <div className="App panel is-success">
      {!isStarted ? (
        <button
          className="button"
          type="button"
          onClick={() => setIsStarted(true)}
        >
          Start
        </button>
      ) : (
        <>
          <div className="panel-heading">
            <button
              className="button"
              type="button"
              onClick={() => setSortType(SortType.ALPABET)}
            >
              Sort alphabetically
            </button>

            <button
              className="button"
              type="button"
              onClick={() => setSortType(SortType.LENGTH)}
            >
              Sort by length
            </button>

            <button
              className="button"
              type="button"
              onClick={() => setIsReversed(!isReversed)}
            >
              Reverse
            </button>

            <button className="button" type="button" onClick={reset}>
              Reset
            </button>
          </div>

          <label className="App__label panel-block">
            Min-length:
            <select
              className="App__select select"
              name="minLength"
              id="minLength"
              value={minLength}
              onChange={e => setMinLength(+e.currentTarget.value)}
            >
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(item => (
                  <option value={item}>{item}</option>
                ))}
            </select>
          </label>

          <ul className="Goods">
            {visibleGoods.map(good => (
              <li key={good} className="Goods__item panel-block">{good}</li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};
