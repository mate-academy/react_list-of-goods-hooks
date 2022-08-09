import { useState, FC } from 'react';
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

  return isReversed
    ? visibleGoods.reverse()
    : visibleGoods;
}

export const App: FC = () => {
  const [isStarted, setStart] = useState(false);
  const [isReversed, setReverse] = useState(false);
  const [sortType, setSortType] = useState(SortType.NONE);

  const startWorking = () => {
    setStart(true);
  };

  const sortByAlphabet = () => {
    setSortType(SortType.ALPABET);
  };

  const sortByLength = () => {
    setSortType(SortType.LENGTH);
  };

  const reverseList = () => {
    setReverse(prev => !prev);
  };

  const resetList = () => {
    setReverse(false);
    setSortType(SortType.NONE);
  };

  const goods = getReorderedGoods(goodsFromServer, sortType, isReversed);

  return (
    <div className="App block notification is-light">
      {isStarted
        ? (
          <>
            <button
              type="button"
              onClick={sortByAlphabet}
              className="button is-primary mr-3"
            >
              Sort alphabetically
            </button>

            <button
              type="button"
              onClick={sortByLength}
              className="button is-primary mr-3"
            >
              Sort by length
            </button>

            <button
              type="button"
              onClick={reverseList}
              className="button is-primary mr-3"
            >
              Reverse
            </button>

            <button
              type="button"
              onClick={resetList}
              className="button is-danger"
            >
              Reset
            </button>

            <ul className="Goods">
              {goods.map(good => {
                return (
                  <li key={good} className="Goods__item">{good}</li>
                );
              })}
            </ul>
          </>
        )
        : (
          <button
            type="button"
            onClick={startWorking}
            className="button is-success"
          >
            Start
          </button>
        )}
    </div>
  );
};
