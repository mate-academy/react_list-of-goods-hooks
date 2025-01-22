import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import cn from 'classnames';
import './App.scss';

export const goodsFromServer: ReadonlyArray<string> = [
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
  SortAlphabetically = 'Sort alphabetically',
  SortByLength = 'Sort by length',
  Default = '',
}

const useGoodsSorter = (
  initialGoods: ReadonlyArray<string>,
): {
  goods: string[];
  sortField: SortType;
  isReversed: boolean;
  handleSort: (field: SortType) => void;
  handleReverse: () => void;
  handleReset: () => void;
} => {
  const [goods, setGoods] = useState<string[]>([...initialGoods]);
  const [sortField, setSortField] = useState<SortType>(SortType.Default);
  const [isReversed, setIsReversed] = useState<boolean>(false);

  const handleSort = (field: SortType): void => {
    const sortedGoods = [...goods];

    if (field === SortType.SortAlphabetically) {
      sortedGoods.sort((a, b) => a.localeCompare(b));
    }

    if (field === SortType.SortByLength) {
      sortedGoods.sort((a, b) => {
        const lengthDifference = a.length - b.length;
        if (lengthDifference !== 0) {
          return lengthDifference;
        }
        return a.localeCompare(b);
      });
    }

    if (isReversed) {
      sortedGoods.reverse();
    }

    setSortField(field);
    setGoods(sortedGoods);
  };

  const handleReverse = (): void => {
    setIsReversed(!isReversed);
    setGoods(prevGoods => [...prevGoods].reverse());
  };

  const handleReset = (): void => {
    setSortField(SortType.Default);
    setIsReversed(false);
    setGoods([...initialGoods]);
  };

  return {
    goods,
    sortField,
    isReversed,
    handleSort,
    handleReverse,
    handleReset,
  };
};

export const App: React.FC = () => {
  const {
    goods,
    sortField,
    isReversed,
    handleSort,
    handleReverse,
    handleReset,
  } = useGoodsSorter(goodsFromServer);

  const areArraysEqual = (arr1: string[], arr2: ReadonlyArray<string>) =>
    arr1.length === arr2.length &&
    arr1.every((value: string, index: number) => value === arr2[index]);

  const isResetVisible = !areArraysEqual(goods, goodsFromServer) || isReversed;

  return (
    <div className="section content">
      <div className="buttons">
        {[SortType.SortAlphabetically, SortType.SortByLength].map(field => (
          <button
            key={field}
            type="button"
            className={cn(
              'button',
              { 'is-light': sortField !== field },
              { 'is-success': sortField === field },
            )}
            onClick={() => handleSort(field)}
          >
            {field}
          </button>
        ))}

        <button
          type="button"
          className={cn('button', 'is-warning', { 'is-light': !isReversed })}
          onClick={handleReverse}
        >
          Reverse
        </button>

        {isResetVisible ? (
          <button
            type="button"
            className="button is-danger"
            onClick={handleReset}
          >
            Reset
          </button>
        ) : null}
      </div>

      <ul>
        {goods.map(good => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
