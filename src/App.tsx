import classNames from 'classnames';
import { useState } from 'react';
import './App.css';

// eslint-disable-next-line @typescript-eslint/no-unused-vars

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
  ALPABET,
  LENGTH,
}

function getReorderedGoods(
  goods: string[],
  sortType: SortType,
  isReversed: boolean,
) {
  const visibleGoods = [...goods];

  visibleGoods.sort((a, b) => {
    switch (sortType) {
      case SortType.ALPABET:
        return a.localeCompare(b);

      case SortType.LENGTH:
        return a.length - b.length;

      default:
        return 0;
    }
  });

  if (isReversed) {
    visibleGoods.reverse();
  }

  return visibleGoods;
}

export const App = () => {
  const [isStarted, setStart] = useState(false);
  const [isReversed, setReverse] = useState(false);
  const [sortType, setSortType] = useState(SortType.NONE);

  const show = () => {
    setStart(true);
  };

  const reverse = () => {
    setReverse(current => !current);
  };

  const sortAlphabetically = () => {
    setSortType(SortType.ALPABET);
  };

  const sortByLength = () => {
    setSortType(SortType.LENGTH);
  };

  const reset = () => {
    setSortType(SortType.NONE);
    setReverse(false);
  };

  const visibleGoods = getReorderedGoods(goodsFromServer,
    sortType, isReversed);

  return (
    <div className="App">
      {!isStarted && (
        <button
          type="button"
          onClick={show}
          className="button is-primary"
        >
          Start
        </button>
      )}

      {isStarted && (
        <>
          <div className="wrapper">
            <button
              type="button"
              onClick={sortAlphabetically}
              className={classNames(
                'button is-primary',
                {
                  active: sortType === SortType.ALPABET,
                },
              )}
            >
              Sort alphabetically
            </button>

            <button
              type="button"
              onClick={sortByLength}
              className={classNames(
                'button is-primary',
                {
                  active: sortType === SortType.LENGTH,
                },
              )}
            >
              Sort by length
            </button>

            <button
              type="button"
              onClick={reverse}
              className={classNames(
                'button is-primary',
                {
                  active: isReversed === true,
                },
              )}
            >
              Reverse
            </button>

            <button
              type="button"
              onClick={reset}
              className="button is-primary is-light"
            >
              Reset
            </button>
          </div>

          <ul className="Goods">
            {visibleGoods.map(good => (
              <li key={good} className="Goods__item">
                {good}
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};
