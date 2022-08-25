import React, { useState } from 'react';
import cn from 'classnames';

import './App.css';

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

  if (sortType === SortType.ALPHABET) {
    visibleGoods.sort((good1, good2) => {
      return good1.localeCompare(good2);
    });
  }

  if (sortType === SortType.LENGTH) {
    visibleGoods.sort((good1, good2) => {
      return good1.length - good2.length;
    });
  }

  if (isReversed) {
    return visibleGoods.reverse();
  }

  return visibleGoods;
}

export const App: React.FC = () => {
  const [isStarted, setIsStarted] = useState(false);
  const [isReversed, setIsReversed] = useState(false);
  const [sortType, setSortType] = useState(SortType.NONE);

  const startWork = () => (setIsStarted(true));
  const sortAlphabet = () => (setSortType(SortType.ALPHABET));
  const sortLength = () => (setSortType(SortType.LENGTH));
  const reverse = () => (setIsReversed(value => !value));
  const reset = () => {
    setIsReversed(false);
    setSortType(SortType.NONE);
  };

  const reversedGoods = getReorderedGoods(
    goodsFromServer,
    sortType,
    isReversed,
  );

  return (
    <div className="App">
      {!isStarted
        ? (
          <button
            type="button"
            className="
              button
              is-link
              is-outlined
              is-large
              start"
            onClick={startWork}
          >
            Start
          </button>
        )
        : (
          <div className="
            box
            has-background-link-light
            contant"
          >
            <div className="buttons">
              <button
                type="button"
                className={cn(
                  'button btn',
                  { 'is-warning': sortType === SortType.ALPHABET },
                )}
                onClick={sortAlphabet}
              >
                Sort alphabetically
              </button>

              <button
                type="button"
                className={cn(
                  'button btn',
                  { 'is-warning': sortType === SortType.LENGTH },
                )}
                onClick={sortLength}
              >
                Sort by length
              </button>
              <button
                type="button"
                onClick={reverse}
                className={cn(
                  'button  btn',
                  { 'is-warning': isReversed === true },
                )}
              >
                Reverse
              </button>

              <button
                type="button"
                onClick={reset}
                className={cn(
                  'button is-info btn',
                  {
                    'is-warning': sortType === SortType.NONE
                  && isReversed === false,
                  },
                )}
              >
                Reset
              </button>
            </div>
            <ul className="listRender">
              {reversedGoods.map(good => {
                return (
                  <li
                    className="listRender__item"
                    key={good}
                  >
                    {good}
                  </li>
                );
              })}
            </ul>
          </div>
        )}
    </div>
  );
};
