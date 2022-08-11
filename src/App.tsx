import React, { useState, ChangeEvent } from 'react';
import './App.css';
import 'bulma/css/bulma.min.css';

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

type State = {
  isStarted: boolean,
  isReversed: boolean,
  sortType: SortType,
  value: number,
};

export const App: React.FC<State> = () => {
  const [isStarted, setIsStarted] = useState(false);
  const [sortType, setSortType] = useState(SortType.NONE);
  const [isReversed, setIsReversed] = useState(false);
  const [value, setValue] = useState(1);

  const start = () => {
    setIsStarted(true);
  };

  const sortByAlpabet = () => {
    setSortType(SortType.ALPABET);
  };

  const sortByLength = () => {
    setSortType(SortType.LENGTH);
  };

  const reverse = () => {
    setIsReversed(!isReversed);
  };

  const reset = () => {
    setSortType(SortType.NONE);
    setIsReversed(false);
    setValue(1);
  };

  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setValue(Number(event.target.value));
  };

  const getReorderedGoods = (
    goods: string[],
    sortBy: SortType,
    isRevers: boolean,
    valueSelect: number,
  ): string[] => {
    const visibleGoods = goods
      .filter(good => good.length >= valueSelect);

    if (sortBy === SortType.ALPABET) {
      visibleGoods.sort((a, b) => b.localeCompare(a));
    }

    if (sortBy === SortType.LENGTH) {
      visibleGoods.sort((a, b) => b.length - a.length);
    }

    if (!isRevers) {
      visibleGoods.reverse();
    }

    return visibleGoods;
  };

  return (
    <div className="App">
      {!isStarted && (
        <button
          type="button"
          className="button is-warning"
          onClick={() => start()}
        >
          Start
        </button>
      )}

      {isStarted
      && (
        <>
          <div className="button-wrapper">
            <button
              type="button"
              className="button is-success"
              onClick={() => sortByAlpabet()}
            >
              Sort alphabetically
            </button>

            <button
              type="button"
              className="button is-success"
              onClick={() => sortByLength()}
            >
              Sort by length
            </button>

            <button
              type="button"
              className="button is-success"
              onClick={() => reverse()}
            >
              Reverse
            </button>

            <button
              type="button"
              className="button is-success"
              onClick={() => reset()}
            >
              Reset
            </button>
          </div>

          <ul className="Goods">
            { getReorderedGoods(
              goodsFromServer,
              sortType,
              isReversed,
              value,
            ).map(good => (
              <li className="Goods__item" key={good}>{good}</li>
            ))}
          </ul>
          <span className="titleSelect">Filterd by name length:</span>
          <select
            name="select"
            value={value}
            onChange={handleChange}
          >
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
          </select>
        </>
      )}
    </div>
  );
};
