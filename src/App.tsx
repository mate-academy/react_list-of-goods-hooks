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

  switch (sortType) {
    case SortType.ALPHABET: {
      visibleGoods.sort((first, second) => {
        return first.localeCompare(second);
      });
      break;
    }

    case SortType.LENGTH: {
      visibleGoods.sort((first, second) => {
        return first.length - second.length;
      });
      break;
    }

    case SortType.NONE: {
      break;
    }

    default: {
      throw new Error('Invalid type');
    }
  }

  return isReversed
    ? visibleGoods.reverse()
    : visibleGoods;
}

export const App: React.FC = () => {
  const [isReversed, setIsReversed] = useState(false);
  const [sortType, setSortType] = useState(SortType.NONE);

  const handleReverse = () => {
    setIsReversed(!isReversed);
  };

  const handleSortAlphabet = () => {
    setSortType(SortType.ALPHABET);
  };

  const handleSortLength = () => {
    setSortType(SortType.LENGTH);
  };

  const handleReset = () => {
    setIsReversed(false);
    setSortType(SortType.NONE);
  };

  const isCurrent = sortType !== SortType.NONE || isReversed;

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${sortType !== SortType.ALPHABET && 'is-light'}`}
          onClick={handleSortAlphabet}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${sortType !== SortType.LENGTH && 'is-light'}`}
          onClick={handleSortLength}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${!isReversed && 'is-light'}`}
          onClick={handleReverse}
        >
          Reverse
        </button>

        {
          isCurrent
            && (
              <button
                type="button"
                className="button is-danger is-light"
                onClick={handleReset}
              >
                Reset
              </button>
            )
        }
      </div>
      <ul>
        { getReorderedGoods(goodsFromServer, { sortType, isReversed })
          .map(good => (
            <li data-cy="Good" key={good}>{good}</li>
          ))}
      </ul>
    </div>
  );
};
