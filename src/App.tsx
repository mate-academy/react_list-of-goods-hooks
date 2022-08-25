import React from 'react';
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
) {
  const visibleGoods = [...goods];

  visibleGoods.sort((g1, g2) => {
    switch (sortType) {
      case SortType.ALPHABET:
        return g1.localeCompare(g2);
      case SortType.LENGTH:
        return g1.length - g2.length;
      default:
        return 0;
    }
  });

  const reverseResult = isReversed
    ? visibleGoods.reverse()
    : visibleGoods;

  return reverseResult;
}

export const App: React.FC = () => {
  const [isStarted, setIsStarted] = React.useState<boolean>(false);
  const [isReversed, setIsReversed] = React.useState<boolean>(false);
  const [sortType, setSortType] = React.useState<SortType>(SortType.NONE);

  const visibleGoods = getReorderedGoods(goodsFromServer, sortType, isReversed);

  const sortByAbc = () => {
    setIsReversed(false);
    setSortType(SortType.ALPHABET);
  };

  const sortByLength = () => {
    setIsReversed(false);
    setSortType(SortType.LENGTH);
  };

  const resetSortReverse = () => {
    setIsReversed(false);
    setSortType(SortType.NONE);
  };

  return (
    <div className="App">
      {!isStarted
        ? (
          <button
            type="button"
            onClick={() => setIsStarted(true)}
          >
            Start
          </button>
        ) : (
          <>
            <button
              type="button"
              onClick={sortByAbc}
            >
              Sort alphabetically
            </button>

            <button
              type="button"
              onClick={sortByLength}
            >
              Sort by length
            </button>

            <button
              type="button"
              onClick={() => setIsReversed(!isReversed)}
            >
              Reverse
            </button>

            <button
              type="button"
              onClick={resetSortReverse}
            >
              Reset
            </button>

            <ul className="Goods">
              {visibleGoods.map((good) => (
                <li key={good}>
                  {good}
                </li>
              ))}
            </ul>
          </>
        )}
    </div>
  );
};
