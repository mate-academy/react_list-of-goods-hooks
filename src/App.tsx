import React, { useEffect, useState } from 'react';
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

export const App: React.FC = () => {
  const [isSortedAlphabetically, setAlphabetSortType] = useState(false);
  const [isSortedByLength, setLengthSortType] = useState(false);
  const [isReversed, setReversedOrder] = useState(false);
  const [originalOrder, setOriginalOrder] = useState<string[]>([]);
  const [sortedArray, setSortedArray] = useState<string[]>([]);

  useEffect(() => {
    setOriginalOrder([...goodsFromServer]);
    setSortedArray([...goodsFromServer]);
  }, []);

  const sortByAlphabet = () => {
    setAlphabetSortType(!isSortedAlphabetically);
    setLengthSortType(false);
    let sorted;

    if (isReversed) {
      sorted = [...sortedArray].sort((a, b) => b.localeCompare(a));
    } else {
      sorted = [...sortedArray].sort((a, b) => a.localeCompare(b));
    }

    setSortedArray(sorted);
  };

  const sortByLength = () => {
    setLengthSortType(!isSortedByLength);
    setAlphabetSortType(false);
    let sorted;

    if (isReversed) {
      sorted = [...sortedArray].sort((a, b) => b.length - a.length);
    } else {
      sorted = [...sortedArray].sort((a, b) => a.length - b.length);
    }

    setSortedArray(sorted);
  };

  const reverse = () => {
    setReversedOrder(!isReversed);
    const reversed = [...sortedArray].reverse();

    setSortedArray(reversed);
  };

  const reset = () => {
    setReversedOrder(false);
    setAlphabetSortType(false);
    setLengthSortType(false);
    setSortedArray([...originalOrder]);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${!isSortedAlphabetically ? 'is-light' : ''}`}
          onClick={sortByAlphabet}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-info ${!isSortedByLength ? 'is-light' : ''}`}
          onClick={sortByLength}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-info ${!isReversed ? 'is-light' : ''}`}
          onClick={reverse}
        >
          Reverse
        </button>

        { (isReversed || isSortedAlphabetically || isSortedByLength) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={reset}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {sortedArray.map(good => (
          <li
            data-cy="Good"
            key={good}
          >
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
