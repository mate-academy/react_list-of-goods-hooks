import 'bulma/css/bulma.css';
import './App.scss';
import React, { useState } from 'react';
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
  Alphabet = 'alphabet',
  Reverse = 'reverse',
  Length = 'length',
}

function handleSortOfGoods(sort: SortType, newSortedGoods: string[]): string[] {
  let sorted: string[] = [];
  const copyOfNewSortedGoods = [...newSortedGoods];

  if (sort === SortType.Alphabet) {
    sorted = copyOfNewSortedGoods.sort((a, b) => a.localeCompare(b));
  }

  if (sort === SortType.Length) {
    sorted = copyOfNewSortedGoods.sort((a, b) => a.length - b.length);
  }

  if (sort === SortType.Reverse) {
    sorted = copyOfNewSortedGoods.reverse();
  }

  return sorted;
}

export const App: React.FC = () => {
  const [sortedGoods, setSortedGoods] = useState(goodsFromServer);
  const [isResetButtonActive, setIsResetButtonActive] = useState(false);
  const [sortType, setSortType] = useState<SortType | null>(null);

  const handleButtonSortAlphabetically = () => {
    const sorted = handleSortOfGoods(SortType.Alphabet, sortedGoods);

    setSortedGoods(sorted);
    setIsResetButtonActive(true);
    setSortType(SortType.Alphabet);
  };

  const handleButtonSortByLength = () => {
    const sorted = handleSortOfGoods(SortType.Length, sortedGoods);

    setSortedGoods(sorted);
    setIsResetButtonActive(true);
    setSortType(SortType.Length);
  };

  const handleButtonReverse = () => {
    const sorted = handleSortOfGoods(SortType.Reverse, sortedGoods);

    setSortedGoods(sorted);
    setIsResetButtonActive(true);
    setSortType(SortType.Reverse);
  };

  const handleButtonReset = () => {
    setSortedGoods(goodsFromServer);
    setIsResetButtonActive(false);
    setSortType(null);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button', 'is-info', {
            'is-light': sortType === SortType.Alphabet,
          })}
          onClick={handleButtonSortAlphabetically}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button', 'is-success', {
            'is-light': sortType === SortType.Length,
          })}
          onClick={handleButtonSortByLength}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button', 'is-warning', {
            'is-light': sortType === SortType.Reverse,
          })}
          onClick={handleButtonReverse}
        >
          Reverse
        </button>
        {isResetButtonActive && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={handleButtonReset}
          >
            Reset
          </button>
        )}
      </div>
      <ul>
        {sortedGoods.map((good) => (
          <li data-cy="Good" key={good}>
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
