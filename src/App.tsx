import React, { useState } from 'react';
import classNames from 'classnames';
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
  const visibleGoods = goods.filter(good => good.length > minLength);

  visibleGoods.sort((good1, good2) => {
    switch (sortType) {
      case SortType.NONE:
        return 0;

      case SortType.ALPABET:
        return good1.localeCompare(good2);

      case SortType.LENGTH:
        return good1.length - good2.length;

      default:
        throw new Error('invalid sorting type');
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
  const [minLength, setMinLength] = useState(0);
  const lengthValues = new Array(Math.max(...goodsFromServer
    .map(good => good.length))).fill('0').map((_, i) => i + 1);

  const startList = () => {
    setIsStarted(true);
  };

  const sortAlphabetically = () => {
    setSortType(SortType.ALPABET);
  };

  const sortByLength = () => {
    setSortType(SortType.LENGTH);
  };

  const reverseSorting = () => {
    setIsReversed(current => !current);
  };

  const resetSorting = () => {
    setSortType(SortType.NONE);
    setIsReversed(false);
    setMinLength(0);
  };

  const changeMinLength = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setMinLength(+event.target.value);
  };

  const preparedGoods = getReorderedGoods(
    goodsFromServer,
    sortType,
    isReversed,
    minLength,
  );

  return (
    <div className="App">

      {isStarted
        ? (
          <>
            <div className="buttons">
              <button
                type="button"
                className={classNames('button',
                  { 'is-active': sortType === SortType.ALPABET })}
                onClick={sortAlphabetically}
              >
                Sort alphabetically
              </button>
              <button
                type="button"
                className={classNames('button',
                  { 'is-active': sortType === SortType.LENGTH })}
                onClick={sortByLength}
              >
                Sort by length
              </button>
              <button
                type="button"
                className={classNames('button', { 'is-active': isReversed })}
                onClick={reverseSorting}
              >
                Reverse
              </button>
              <button
                type="button"
                className="button"
                onClick={resetSorting}
              >
                Reset
              </button>
            </div>

            <div>
              <select
                name="select"
                className="select"
                value={minLength}
                onChange={value => changeMinLength(value)}
              >
                <option value="0" hidden>select</option>

                {lengthValues.map((length) => {
                  return (
                    <option value={length} key={length}>
                      {length}

                    </option>
                  );
                })}
              </select>
            </div>

            <ul className="Goods">
              {preparedGoods.map(good => {
                return (
                  <li className="Goods__item" key={good}>{good}</li>
                );
              })}
            </ul>
          </>
        ) : (
          <div className="buttons">
            <button
              type="button"
              className="button"
              onClick={startList}
            >
              Start
            </button>
          </div>
        )}
    </div>
  );
};
