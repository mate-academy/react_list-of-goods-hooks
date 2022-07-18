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

export const App: React.FC = () => {
  const [isVisible, visibleGoods] = useState(false);
  const [isReversed, reverseGoods] = useState(false);
  const [sortType, setSortType] = useState<SortType>(SortType.NONE);

  const goodsCopy = [...goodsFromServer];

  const showGoods = () => {
    visibleGoods(true);
  };

  const reverse = () => {
    reverseGoods(!isReversed);
  };

  const reset = () => {
    visibleGoods(false);
    setSortType(SortType.NONE);
    reverseGoods(false);
  };

  switch (sortType) {
    case SortType.LENGTH:
      goodsCopy.sort((good, prevGood) => good.length - prevGood.length);
      break;

    case SortType.ALPABET:
      goodsCopy.sort((good, prevGood) => good.localeCompare(prevGood));
      break;

    default:
  }

  if (isReversed) {
    goodsCopy.reverse();
  }

  return (
    <div className="App">
      {!isVisible && (
        <button
          className="button buttons__forSort-start"
          type="button"
          onClick={showGoods}
        >
          Start
        </button>
      )}

      {isVisible && (
        <div className="Goods">
          <ul className="Goods__list">
            {(goodsCopy.map((good) => (
              <li className="Goods__item" key={good}>
                {good}
              </li>
            )))}
          </ul>

          <div className="buttons__forSort">
            <button
              className="button buttons__forSort-reverse"
              type="button"
              onClick={reverse}
            >
              Reverse
            </button>

            <button
              className="button buttons__forSort-reset"
              type="button"
              onClick={reset}
            >
              Reset
            </button>

            <button
              className="button buttons__forSort-length"
              type="button"
              onClick={() => setSortType(SortType.LENGTH)}
            >
              Sort By Length
            </button>

            <button
              className="button buttons__forSort-alphabet"
              type="button"
              onClick={() => setSortType(SortType.ALPABET)}
            >
              Sort alphabetically
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
