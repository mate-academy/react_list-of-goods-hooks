import React, { useState } from 'react';
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
];

enum SortType {
  Default = 'default',
  Alphabetically = 'alphabetically',
  Length = 'length',
  Reverse = 'reverse',
}

export const App: React.FC = () => {
  const [copyArray, setArray] = useState([...goodsFromServer]);
  const [currentSort, setCurrentSort] = useState<SortType>(SortType.Default);
  const [isReversed, setIsReversed] = useState(false);

  const isOriginalOrder = () => {
    return JSON.stringify(copyArray) === JSON.stringify(goodsFromServer);
  };

  const sortAlphabetically = () => {
    const sortedArray = [...goodsFromServer].sort((a, b) => a.localeCompare(b));

    setArray(isReversed ? sortedArray.reverse() : sortedArray);
    setCurrentSort(SortType.Alphabetically);
  };

  const sortByLength = () => {
    const sortedArray = [...goodsFromServer].sort(
      (a, b) => a.length - b.length,
    );

    setArray(isReversed ? sortedArray.reverse() : sortedArray);
    setCurrentSort(SortType.Length);
  };

  const reverse = () => {
    setArray([...copyArray].reverse());
    setIsReversed(prev => !prev);
  };

  const resetArray = () => {
    setArray([...goodsFromServer]);
    setCurrentSort(SortType.Default);
    setIsReversed(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={sortAlphabetically}
          type="button"
          className={`button is-info ${currentSort === SortType.Alphabetically ? '' : 'is-light'}`}
        >
          Sort alphabetically
        </button>

        <button
          onClick={sortByLength}
          type="button"
          className={`button is-info ${currentSort === SortType.Length ? '' : 'is-light'}`}
        >
          Sort by length
        </button>

        <button
          onClick={reverse}
          type="button"
          className={`button is-info ${isReversed ? '' : 'is-light'}`}
        >
          Reverse
        </button>

        {!isOriginalOrder() && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={resetArray}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {copyArray.map(item => (
          <li key={item} data-cy="Good">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};
