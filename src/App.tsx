import { useState } from 'react';
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

function getReorderedGoods(
  goods: string[],
  sortType: number,
  isReversed: boolean,
) {
  const visibleGoods = [...goods];

  visibleGoods.sort((a, b) => {
    switch (sortType) {
      case 1:
        return a.localeCompare(b);
      case 2:
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
  const [isReversed, setIsReversed] = useState(false);
  const [sortType, setSortType] = useState(0);
  const [isStarted, setIsStarted] = useState(false);

  const reset = () => {
    setSortType(0);
    setIsReversed(false);
  };

  return (
    <div className="App">
      <button
        className="button is-info"
        type="button"
        onClick={() => setIsStarted((current) => !current)}
      >
        {isStarted ? 'End' : 'Start'}
      </button>
      {isStarted && (
        <>
          <button
            className="button is-info"
            type="button"
            onClick={() => setSortType(1)}
          >
            Sort alphabetically
          </button>

          <button
            className="button is-info"
            type="button"
            onClick={() => setSortType(2)}
          >
            Sort by length
          </button>

          <button
            className="button is-info"
            type="button"
            onClick={() => setIsReversed((current) => !current)}
          >
            Reverse
          </button>

          <button
            className="button is-info"
            type="button"
            onClick={reset}
          >
            Reset
          </button>

          <ul className="Goods box">
            {getReorderedGoods(
              goodsFromServer,
              sortType,
              isReversed,
            ).map(good => (
              <li
                key={good}
                className="Goods__item"
              >
                {good}
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};
