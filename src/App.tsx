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

export const App: React.FC = () => {
  const [isStarted, setIsStarted] = useState(false);
  const [isReversed, setIsReversed] = useState(false);
  const [sortType, setSortType] = useState(SortType.NONE);

  function getReorderedGoods(
    goods: string[],
  ) {
    // Not to mutate the original array
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
    // Sort and reverse goods if needed
    // ...

    return visibleGoods;
  }

  const setReset = () => {
    setIsReversed(false);
    setSortType(SortType.NONE);
  };

  const reorderList = getReorderedGoods(
    goodsFromServer,
  );

  return (
    <div className="App">
      {!isStarted && (
        <button
          type="button"
          onClick={() => setIsStarted(!isStarted)}
        >
          Start
        </button>
      )}

      {isStarted && (
        <>
          <button
            className={
              classNames('button',
                { 'button--active': sortType === SortType.ALPABET })
            }
            type="button"
            onClick={() => setSortType(SortType.ALPABET)}
          >
            Sort alphabetically
          </button>
          <button
            className={
              classNames('button',
                { 'button--active': sortType === SortType.LENGTH })
            }
            type="button"
            onClick={() => setSortType(SortType.LENGTH)}
          >
            Sort by length
          </button>
          <button
            className={
              classNames('button',
                { 'button--active': isReversed })
            }
            type="button"
            onClick={() => setIsReversed(!isReversed)}
          >
            Reverse
          </button>
          <button
            className="button"
            type="button"
            onClick={() => setReset()}
          >
            Reset
          </button>
          <ul className="Goods">
            {reorderList.map(el => (
              <li className="Goods__item">
                {el}
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};
