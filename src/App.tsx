import React, { useState, ChangeEvent } from 'react';
import './App.css';
import 'bulma/css/bulma.min.css';
import cn from 'classnames';

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
  valueMinLensthGood: number,
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

export const App: React.FC<State> = () => {
  const [isStarted, setIsStarted] = useState(false);
  const [sortType, setSortType] = useState(SortType.NONE);
  const [isReversed, setIsReversed] = useState(false);
  const [valueMinLensthGood, setValue] = useState(1);

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

  const handleChangeValueLength = (event: ChangeEvent<HTMLSelectElement>) => {
    setValue(Number(event.target.value));
  };

  const positionsSelect = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];
  const resultGoods = getReorderedGoods(
    goodsFromServer,
    sortType,
    isReversed,
    valueMinLensthGood,
  );

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
              className={cn(
                'button',
                'is-success',
                { 'is-light': sortType === SortType.ALPABET },
              )}
              onClick={() => sortByAlpabet()}
            >
              Sort alphabetically
            </button>

            <button
              type="button"
              className={cn(
                'button',
                'is-success',
                { 'is-light': sortType === SortType.LENGTH },
              )}
              onClick={() => sortByLength()}
            >
              Sort by length
            </button>

            <button
              type="button"
              className={cn(
                'button',
                'is-success',
                { 'is-light': isReversed },
              )}
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
            { resultGoods.map(good => (
              <li className="Goods__item" key={good}>{good}</li>
            ))}
          </ul>
          <span className="titleSelect">Filterd by name length:</span>
          <select
            name="select"
            value={valueMinLensthGood}
            onChange={handleChangeValueLength}
          >
            { positionsSelect.map(position => (
              <option key={position} value={position}>{position}</option>))}
          </select>
        </>
      )}
    </div>
  );
};
