import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
import cn from 'classnames';

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

  switch (sortType) {
    case SortType.ALPHABET:
      return (isReversed)
        ? [...visibleGoods].sort((a, b) => b.localeCompare(a))
        : [...visibleGoods].sort((a, b) => a.localeCompare(b));
    case SortType.LENGTH:
      return (isReversed)
        ? [...visibleGoods].sort((a, b) => b.length - a.length)
        : [...visibleGoods].sort((a, b) => a.length - b.length);
    default:
      return (isReversed)
        ? [...visibleGoods].reverse()
        : [...visibleGoods];
  }
}

export const App: React.FC = () => {
  const [visibleGoods, setVisibleGoods] = useState([...goodsFromServer]);
  const [activeSort, setActiveSort] = useState(SortType.NONE);
  const [activeReset, setActiveReset] = useState(false);
  const [activeReverse, setActiveReverse] = useState(false);

  const handleAlphabet = () => {
    setVisibleGoods(getReorderedGoods(visibleGoods, {
      sortType: SortType.ALPHABET,
      isReversed: activeReverse,
    }));

    setActiveSort(SortType.ALPHABET);
    setActiveReset(true);
  };

  const handleLength = () => {
    setVisibleGoods(getReorderedGoods(visibleGoods, {
      sortType: SortType.LENGTH,
      isReversed: activeReverse,
    }));

    setActiveSort(SortType.LENGTH);
    setActiveReset(true);
  };

  const handleReverse = () => {
    setVisibleGoods([...visibleGoods].reverse());
    setActiveReverse(!activeReverse);

    if (activeSort !== SortType.NONE) {
      setActiveReset(activeReset);
    } else {
      setActiveReset(!activeReset);
    }
  };

  const handleReset = () => {
    setVisibleGoods(goodsFromServer);
    setActiveReset(false);
    setActiveReverse(false);
    setActiveSort(SortType.NONE);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn({
            'button is-info is-light': activeSort !== SortType.ALPHABET,
            'button is-info': activeSort === SortType.ALPHABET,
          })}
          onClick={() => handleAlphabet()}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn({
            'button is-success is-light': activeSort !== SortType.LENGTH,
            'button is-success': activeSort === SortType.LENGTH,
          })}
          onClick={() => handleLength()}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn({
            'button is-warning is-light': !activeReverse,
            'button is-warning': activeReverse,
          })}
          onClick={() => handleReverse()}
        >
          Reverse
        </button>

        {activeReset
          && (
            <button
              type="button"
              className="button is-danger is-light"
              onClick={() => {
                handleReset();
              }}
            >
              Reset
            </button>
          )}
      </div>

      <ul>
        <ul>
          {visibleGoods.map(good => (
            <li data-cy="Good">
              {good}
            </li>
          ))}
        </ul>
      </ul>
    </div>
  );
};
