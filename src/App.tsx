import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';

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

enum SortType {
  NONE,
  ALPHABET,
  LENGTH,
}

type ReorderOptions = {
  sortType: SortType,
  isReversed: boolean,
};

export function getReorderedGoods(
  goods: string[],
  { sortType, isReversed }: ReorderOptions,
) {
  const visibleGoods = [...goods];

  visibleGoods.sort((a, b) => {
    switch (sortType) {
      case SortType.ALPHABET:
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

export const App: React.FC = () => {
  const [isReversed, setIsReversed] = useState(false);
  const [sortType, setSortType] = useState(0);
  const goods = getReorderedGoods(
    goodsFromServer, { isReversed, sortType },
  );

  function reset() {
    setIsReversed(false);
    setSortType(0);
  }

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${sortType === SortType.ALPHABET ? '' : 'is-light'}`}
          onClick={() => setSortType(1)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${sortType === SortType.LENGTH ? '' : 'is-light'}`}
          onClick={() => setSortType(2)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={isReversed
            ? 'button is-warning'
            : 'button is-warning is-light'}
          onClick={() => setIsReversed(value => !value)}
        >
          Reverse
        </button>

        { (isReversed || sortType !== 0) && (
          <button
            type="button"
            className={
              sortType === SortType.NONE && !isReversed
                ? 'button is-info'
                : 'button is-info is-light'
            }
            onClick={() => reset()}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        <ul>
          {goods.map(item => (
            <li key={item}>
              {item}
            </li>
          ))}
        </ul>
      </ul>
    </div>
  );
};
