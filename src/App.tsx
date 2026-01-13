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
  sortType: SortType;
  isReversed: boolean;
};

function getReorderedGoods(goods: string[], options: ReorderOptions): string[] {
  const { sortType, isReversed } = options;

  const visibleGoods = [...goods];

  if (sortType === SortType.ALPHABET) {
    visibleGoods.sort((a, b) => a.localeCompare(b));
  }

  if (sortType === SortType.LENGTH) {
    visibleGoods.sort((a, b) => a.length - b.length);
  }

  if (isReversed) {
    visibleGoods.reverse();
  }

  return visibleGoods;
}

export const App: React.FC = () => {
  const [sortType, setSortType] = useState<SortType>(SortType.NONE);
  const [isReversed, setIsReversed] = useState(false);

  const visibleGoods = getReorderedGoods(goodsFromServer, {
    sortType,
    isReversed,
  });

  const isDefaultOrder = sortType === SortType.NONE && !isReversed;

  const handleSortAlphabet = () => {
    setSortType(SortType.ALPHABET);
  };

  const handleSortLength = () => {
    setSortType(SortType.LENGTH);
  };

  const handleReverse = () => {
    setIsReversed(prev => !prev);
  };

  const handleReset = () => {
    setSortType(SortType.NONE);
    setIsReversed(false);
  };

  const alphabetButtonClass = `button is-info${
    sortType === SortType.ALPHABET ? '' : ' is-light'
  }`;

  const lengthButtonClass = `button is-success${
    sortType === SortType.LENGTH ? '' : ' is-light'
  }`;

  const reverseButtonClass = `button is-warning${isReversed ? '' : ' is-light'}`;

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={alphabetButtonClass}
          onClick={handleSortAlphabet}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={lengthButtonClass}
          onClick={handleSortLength}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={reverseButtonClass}
          onClick={handleReverse}
        >
          Reverse
        </button>

        {!isDefaultOrder && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={handleReset}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        <ul>
          {visibleGoods.map(good => (
            <li key={good} data-cy="Good">
              {good}
            </li>
          ))}
        </ul>
      </ul>
    </div>
  );
};
