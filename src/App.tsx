import classNames from 'classnames';
import React, { useState } from 'react';
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
  // Not to mutate the original array
  const visibleGoods = [...goods];

  switch (sortType) {
    case SortType.ALPABET:
      visibleGoods.sort((good1, good2) => good1.localeCompare(good2));
      break;
    case SortType.LENGTH:
      visibleGoods.sort((good1, good2) => good1.length - good2.length);
      break;
    default:
      break;
  }

  if (isReversed) {
    visibleGoods.reverse();
  }

  return visibleGoods;
}

export const App: React.FC = () => {
  const [isReversed, makeReversed] = useState(false);
  const [isStarted, getStarted] = useState(false);
  const [sortType, setSortType] = useState(SortType.NONE);

  const reordered = getReorderedGoods(
    goodsFromServer,
    sortType,
    isReversed,
  );

  if (!isStarted) {
    return (
      <div className="App">
        <button
          type="button"
          className="button"
          onClick={() => getStarted(true)}
        >
          Start
        </button>
      </div>
    );
  }

  return (
    <div className="App">
      <div className="sortButtons">
        <button
          type="button"
          className={classNames(
            'button',
            sortType === SortType.ALPABET
              ? 'button-used'
              : '',
          )}
          onClick={() => setSortType(SortType.ALPABET)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={classNames(
            'button',
            sortType === SortType.LENGTH
              ? 'button-used'
              : '',
          )}
          onClick={() => setSortType(SortType.LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={classNames(
            'button',
            isReversed
              ? 'button-used'
              : '',
          )}
          onClick={() => makeReversed(!(isReversed))}
        >
          Reverse
        </button>

        <button
          type="button"
          className="button"
          onClick={() => {
            makeReversed(false);
            setSortType(SortType.NONE);
          }}
        >
          Reset
        </button>
      </div>

      <ul className="Goods">
        {reordered.map(good => {
          return (
            <li
              className="Goods__item"
              key={good}
            >
              {good}
            </li>
          );
        })}
      </ul>
    </div>
  );
};
