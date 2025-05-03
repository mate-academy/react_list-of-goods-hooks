import 'bulma/css/bulma.css';
import './App.scss';
import React, { useState } from 'react';

export const goodsFromServer = [
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

export enum SortType {
  None = '',
  Alphabetically = 'alphabetically',
  ByLength = 'length',
}

function sortGoodsByState(
  goods: string[],
  { stateGoods, reverse }: { stateGoods: SortType; reverse: boolean },
) {
  const goodsCopy = [...goods];

  switch (stateGoods) {
    case SortType.Alphabetically:
      goodsCopy.sort((good1, good2) => good1.localeCompare(good2));
      break;

    case SortType.ByLength:
      goodsCopy.sort((good1, good2) => good1.length - good2.length);
      break;
  }

  if (reverse) {
    goodsCopy.reverse();
  }

  return goodsCopy;
}

export const App = () => {
  const [sortGoods, setSortGoods] = useState<SortType>(SortType.None);
  const [reverse, setReverse] = useState(false);
  const visibleGoods = sortGoodsByState(goodsFromServer, {
    stateGoods: sortGoods,
    reverse,
  });

  const handleReverse = () => {
    setReverse(!reverse);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => setSortGoods(SortType.Alphabetically)}
          type="button"
          className={
            sortGoods === SortType.Alphabetically
              ? 'button is-info'
              : 'button is-info is-light'
          }
        >
          Sort alphabetically
        </button>

        <button
          onClick={() => setSortGoods(SortType.ByLength)}
          type="button"
          className={
            sortGoods === SortType.ByLength
              ? 'button is-info'
              : 'button is-info is-light'
          }
        >
          Sort by length
        </button>

        <button
          onClick={() => handleReverse()}
          type="button"
          className={reverse ? 'button is-info' : 'button is-info is-light'}
        >
          Reverse
        </button>

        {(sortGoods || reverse) && (
          <button
            onClick={() => {
              setSortGoods(SortType.None);
              setReverse(false);
            }}
            type="button"
            className="button is-danger is-light"
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {visibleGoods.map(good => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
