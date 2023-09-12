import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';

enum SortType {
  Alphabetically = 'alphabetically',
  Length = 'length',
  Default = '',
}

const initialGoods: string[] = [
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

// eslint-disable-next-line max-len
const stableSort = (array: string[], compareFunction: (a: string, b: string) => number) => {
  return array
    .map((item, index) => ({ item, index }))
    .sort((a, b) => compareFunction(a.item, b.item) || a.index - b.index)
    .map(({ item }) => item);
};

export const App: React.FC = () => {
  const [goods, setGoods] = useState<string[]>(initialGoods);
  const [sortType, setSortType] = useState<SortType>(SortType.Default);
  const [ascending, setAscending] = useState<boolean>(true);
  // eslint-disable-next-line max-len
  const [originalOrderReversed, setOriginalOrderReversed] = useState<boolean>(false);

  const handleSort = (type: SortType) => {
    let sortedGoods = [...goods];

    if (type === SortType.Alphabetically) {
      sortedGoods = stableSort([...goods], (a, b) => a.localeCompare(b));
    } else if (type === SortType.Length) {
      sortedGoods = stableSort(
        [...goods],
        (a, b) => a.length - b.length || goods.indexOf(a) - goods.indexOf(b),
      );
    }

    if (!ascending) {
      sortedGoods.reverse();
    }

    setGoods(sortedGoods);
    setSortType(type);
    setAscending(true);
    setOriginalOrderReversed(false);
  };

  const handleReverse = () => {
    if (sortType) {
      setGoods([...goods].reverse());
      setAscending(!ascending);
      setOriginalOrderReversed(false);
    } else {
      const reversedOriginalOrder = [...initialGoods].reverse();

      setGoods(reversedOriginalOrder);
      setOriginalOrderReversed(!originalOrderReversed);
    }
  };

  const handleReset = () => {
    setGoods(initialGoods);
    setSortType(SortType.Default);
    setAscending(true);
    setOriginalOrderReversed(false);
  };

  // eslint-disable-next-line max-len
  const isResetVisible = sortType !== SortType.Default || !ascending || originalOrderReversed;

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${sortType === SortType.Alphabetically ? '' : 'is-light'}`}
          onClick={() => handleSort(SortType.Alphabetically)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${sortType === SortType.Length ? '' : 'is-light'}`}
          onClick={() => handleSort(SortType.Length)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${
            originalOrderReversed || !sortType || !ascending ? '' : 'is-light'
          }`}
          onClick={handleReverse}
        >
          Reverse
        </button>

        {isResetVisible && (
          <button
            type="button"
            className="button is-danger"
            onClick={handleReset}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {goods.map((good) => (
          <li key={good} data-cy={good}>
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
