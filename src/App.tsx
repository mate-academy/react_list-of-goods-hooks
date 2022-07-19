import React, { useState } from 'react';
import './App.css';
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

export const App: React.FC = () => {
  const [isStarted, setIsStarted] = useState(false);
  const [sortType, setSortType] = useState(SortType.NONE);
  const [isReversed, setIsReversed] = useState(false);

  function getReorderedGoods(goods: string[]) {
    const visibleGoods = [...goods];

    switch (sortType) {
      case SortType.ALPABET:
        visibleGoods.sort((goodA, goodB) => goodA.localeCompare(goodB));
        break;

      case SortType.LENGTH:
        visibleGoods.sort((goodA, goodB) => goodA.length - goodB.length);
        break;

      default:
        break;
    }

    return isReversed ? visibleGoods.reverse() : visibleGoods;
  }

  function reverse() {
    setIsReversed(!isReversed);
  }

  function reset() {
    setSortType(SortType.NONE);
    setIsReversed(false);
  }

  return (
    <article className="App panel is-warning">
      {!isStarted
        ? (
          <button
            className="button is-large is-info is-fullwidth"
            type="button"
            onClick={() => setIsStarted(true)}
          >
            Start
          </button>
        )
        : (
          <>
            <p className="App__title panel-heading">
              Shoping-list
            </p>

            <div className="panel-tabs">
              <button
                className="button is-white"
                type="button"
                onClick={() => setSortType(SortType.ALPABET)}
              >
                Sort alphabetically
              </button>

              <button
                className="button is-white"
                type="button"
                onClick={() => setSortType(SortType.LENGTH)}
              >
                Sort by length
              </button>

              <button
                className="button is-white"
                type="button"
                onClick={() => reverse()}
              >
                Reverse
              </button>

              <button
                className="button is-danger is-light"
                type="button"
                onClick={() => reset()}
              >
                Reset
              </button>
            </div>

            <div className="Goods">
              {getReorderedGoods(goodsFromServer).map(good => (
                <a
                  href="#test"
                  key={good}
                  className="Goods__item panel-block"
                >
                  {good}
                </a>
              ))}
            </div>
          </>
        )}
    </article>
  );
};
